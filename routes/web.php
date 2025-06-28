<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PostController::class, 'index'])->name('home');
Route::get('/posts', [PostController::class, 'posts'])->name('posts.index');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/tags', [PostController::class, 'tags'])->name('tags.index');
Route::get('/tags/{tag}', [PostController::class, 'tagPosts'])->name('tags.posts');
Route::get('/search', [PostController::class, 'search'])->name('search');
Route::get('/about', [PostController::class, 'about'])->name('about');
Route::get('/hireme', [PostController::class, 'hireMe'])->name('hireme');
