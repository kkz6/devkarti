<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use League\CommonMark\CommonMarkConverter;
use Symfony\Component\Yaml\Yaml;
use Carbon\Carbon;

class MigrateAstroPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'astro:migrate-posts {path? : Path to Astro content/blog directory}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate Astro markdown posts to Laravel database';

    /**
     * The markdown converter instance.
     *
     * @var CommonMarkConverter
     */
    protected $converter;

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
        $this->converter = new CommonMarkConverter([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = $this->argument('path') ?? '../src/content/blog';
        $fullPath = base_path($path);

        if (!File::isDirectory($fullPath)) {
            $this->error("Directory not found: {$fullPath}");
            $this->info("Please provide the correct path to your Astro content/blog directory.");
            return 1;
        }

        $this->info("Migrating posts from: {$fullPath}");

        $files = File::files($fullPath);
        $migratedCount = 0;
        $skippedCount = 0;

        foreach ($files as $file) {
            if ($file->getExtension() !== 'md') {
                continue;
            }

            $this->info("Processing: {$file->getFilename()}");

            try {
                $result = $this->processMdFile($file);
                if ($result) {
                    $migratedCount++;
                    $this->info("✓ Migrated: {$file->getFilename()}");
                } else {
                    $skippedCount++;
                    $this->warn("⚠ Skipped: {$file->getFilename()} (already exists)");
                }
            } catch (\Exception $e) {
                $this->error("✗ Failed to migrate {$file->getFilename()}: {$e->getMessage()}");
            }
        }

        $this->info("");
        $this->info("Migration completed!");
        $this->info("Migrated: {$migratedCount} posts");
        $this->info("Skipped: {$skippedCount} posts");

        return 0;
    }

    /**
     * Process a single markdown file.
     */
    protected function processMdFile($file): bool
    {
        $content = File::get($file->getPathname());

        // Extract frontmatter and content
        $parts = $this->extractFrontmatter($content);
        if (!$parts) {
            throw new \Exception("Invalid markdown file format");
        }

        $frontmatter = $parts['frontmatter'];
        $markdownContent = $parts['content'];

        // Check if post already exists
        $slug = $frontmatter['slug'] ?? Str::slug($frontmatter['title']);
        if (Post::where('slug', $slug)->exists()) {
            return false;
        }

        // Convert markdown to HTML
        $htmlContent = $this->converter->convert($markdownContent)->getContent();

        // Process image paths
        $htmlContent = $this->processImagePaths($htmlContent);

        // Parse dates
        $publishedAt = $this->parseDate($frontmatter['pubDatetime'] ?? $frontmatter['publishDate'] ?? now());
        $modifiedAt = isset($frontmatter['modDatetime']) ? $this->parseDate($frontmatter['modDatetime']) : null;

        // Create the post
        $post = Post::create([
            'title' => $frontmatter['title'],
            'slug' => $slug,
            'author' => $frontmatter['author'] ?? config('site.author', 'Karthick'),
            'description' => $frontmatter['description'] ?? '',
            'content' => $htmlContent,
            'featured' => $frontmatter['featured'] ?? false,
            'draft' => $frontmatter['draft'] ?? false,
            'og_image' => $this->processOgImage($frontmatter['ogImage'] ?? null),
            'canonical_url' => $frontmatter['canonicalURL'] ?? null,
            'published_at' => $publishedAt,
            'created_at' => $publishedAt,
            'updated_at' => $modifiedAt ?? $publishedAt,
        ]);

        // Attach tags
        if (isset($frontmatter['tags']) && is_array($frontmatter['tags'])) {
            foreach ($frontmatter['tags'] as $tagName) {
                $tag = Tag::firstOrCreate(
                    ['slug' => Str::slug($tagName)],
                    ['name' => $tagName]
                );
                $post->tags()->attach($tag);
            }
        }

        return true;
    }

    /**
     * Extract frontmatter and content from markdown file.
     */
    protected function extractFrontmatter(string $content): ?array
    {
        // Match frontmatter between --- markers
        if (preg_match('/^---\s*\n(.*?)\n---\s*\n(.*)$/s', $content, $matches)) {
            try {
                $frontmatter = Yaml::parse($matches[1]);
                $markdownContent = trim($matches[2]);

                return [
                    'frontmatter' => $frontmatter,
                    'content' => $markdownContent,
                ];
            } catch (\Exception $e) {
                return null;
            }
        }

        return null;
    }

    /**
     * Parse various date formats.
     */
    protected function parseDate($date): Carbon
    {
        if ($date instanceof \DateTime) {
            return Carbon::instance($date);
        }

        if (is_string($date)) {
            // Try ISO 8601 format first
            try {
                return Carbon::parse($date);
            } catch (\Exception $e) {
                // Try other formats
                $formats = [
                    'Y-m-d\TH:i:s\Z',
                    'Y-m-d\TH:i:s.v\Z',
                    'Y-m-d H:i:s',
                    'Y-m-d',
                ];

                foreach ($formats as $format) {
                    try {
                        return Carbon::createFromFormat($format, $date);
                    } catch (\Exception $e) {
                        continue;
                    }
                }
            }
        }

        return Carbon::now();
    }

    /**
     * Process image paths in content.
     */
    protected function processImagePaths(string $content): string
    {
        // Replace relative image paths with absolute paths
        // This assumes images are copied to public/posts/
        $content = preg_replace(
            '/!\[([^\]]*)\]\(\/posts\/([^)]+)\)/',
            '![$1](/posts/$2)',
            $content
        );

        // Handle images with different path formats
        $content = preg_replace(
            '/src="\/posts\/([^"]+)"/',
            'src="/posts/$1"',
            $content
        );

        return $content;
    }

    /**
     * Process og:image path.
     */
    protected function processOgImage($ogImage): ?string
    {
        if (!$ogImage) {
            return null;
        }

        // If it's already a full path, return as is
        if (is_string($ogImage) && (str_starts_with($ogImage, 'http') || str_starts_with($ogImage, '/'))) {
            return $ogImage;
        }

        // Otherwise, assume it's a relative path
        return '/posts/' . $ogImage;
    }
}
