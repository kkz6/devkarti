<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author')->default('Karthick');
            $table->text('description');
            $table->longText('content');
            $table->boolean('featured')->default(false);
            $table->boolean('draft')->default(false);
            $table->string('og_image')->nullable();
            $table->string('canonical_url')->nullable();
            $table->timestamp('published_at');
            $table->timestamps();

            $table->index('slug');
            $table->index('published_at');
            $table->index(['draft', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
