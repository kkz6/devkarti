<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CopyAstroImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'astro:copy-images {source? : Path to Astro public directory} {--force : Overwrite existing files}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy images from Astro project to Laravel public directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sourcePath = $this->argument('source') ?? '../public';
        $fullSourcePath = base_path($sourcePath);
        $force = $this->option('force');

        if (!File::isDirectory($fullSourcePath)) {
            $this->error("Source directory not found: {$fullSourcePath}");
            $this->info("Please provide the correct path to your Astro public directory.");
            return 1;
        }

        $this->info("Copying images from: {$fullSourcePath}");

        // Copy posts images
        $postsSourcePath = $fullSourcePath . '/posts';
        if (File::isDirectory($postsSourcePath)) {
            $this->copyDirectory($postsSourcePath, public_path('posts'), $force);
        }

        // Copy assets images
        $assetsSourcePath = $fullSourcePath . '/assets';
        if (File::isDirectory($assetsSourcePath)) {
            $this->copyDirectory($assetsSourcePath, public_path('assets'), $force);
        }

        // Copy specific images from root
        $rootImages = ['favicon.png', 'favicon.svg', 'pic-karti.jpg', 'astropaper-og.jpg'];
        foreach ($rootImages as $image) {
            $sourceFile = $fullSourcePath . '/' . $image;
            if (File::exists($sourceFile)) {
                $destFile = public_path($image);
                if (!File::exists($destFile) || $force) {
                    File::copy($sourceFile, $destFile);
                    $this->info("✓ Copied: {$image}");
                } else {
                    $this->warn("⚠ Skipped: {$image} (already exists)");
                }
            }
        }

        $this->info("");
        $this->info("Image copying completed!");

        return 0;
    }

    /**
     * Copy a directory recursively.
     */
    protected function copyDirectory(string $source, string $destination, bool $force): void
    {
        if (!File::isDirectory($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $files = File::allFiles($source);
        $copiedCount = 0;
        $skippedCount = 0;

        foreach ($files as $file) {
            $relativePath = str_replace($source . '/', '', $file->getPathname());
            $destPath = $destination . '/' . $relativePath;
            $destDir = dirname($destPath);

            if (!File::isDirectory($destDir)) {
                File::makeDirectory($destDir, 0755, true);
            }

            if (!File::exists($destPath) || $force) {
                File::copy($file->getPathname(), $destPath);
                $copiedCount++;
                $this->info("✓ Copied: {$relativePath}");
            } else {
                $skippedCount++;
                $this->warn("⚠ Skipped: {$relativePath} (already exists)");
            }
        }

        $this->info("Copied {$copiedCount} files, skipped {$skippedCount} files from " . basename($source));
    }
}
