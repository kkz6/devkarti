<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $featuredPosts = Post::with('tags')
            ->published()
            ->featured()
            ->latest('published_at')
            ->get();

        $recentPosts = Post::with('tags')
            ->published()
            ->where('featured', false)
            ->latest('published_at')
            ->limit(4)
            ->get();

        return Inertia::render('Home', [
            'featuredPosts' => $featuredPosts,
            'recentPosts' => $recentPosts,
        ]);
    }

    public function posts(Request $request)
    {
        $posts = Post::with('tags')
            ->published()
            ->latest('published_at')
            ->paginate(config('site.posts_per_page', 3));

        return Inertia::render('Posts', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post)
    {
        if ($post->draft || $post->published_at->isFuture()) {
            abort(404);
        }

        $post->load('tags');

        return Inertia::render('PostDetails', [
            'post' => $post,
        ]);
    }

    public function tags()
    {
        $tags = Tag::withCount(['posts' => function ($query) {
            $query->published();
        }])
            ->having('posts_count', '>', 0)
            ->orderBy('name')
            ->get();

        return Inertia::render('Tags', [
            'tags' => $tags,
        ]);
    }

    public function tagPosts(Tag $tag, Request $request)
    {
        $posts = $tag->posts()
            ->with('tags')
            ->published()
            ->latest('published_at')
            ->paginate(config('site.posts_per_page', 3));

        return Inertia::render('TagPosts', [
            'tag' => $tag,
            'posts' => $posts,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get('q', '');

        $posts = Post::with('tags')
            ->published()
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->latest('published_at')
            ->paginate(config('site.posts_per_page', 3));

        return Inertia::render('Search', [
            'posts' => $posts,
            'query' => $query,
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function hireMe()
    {
        return Inertia::render('HireMe');
    }
}
