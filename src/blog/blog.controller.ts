import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Render, InertiaService, Defer, Always } from '../inertia';

@Controller()
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly inertiaService: InertiaService,
  ) {
    // Share global data that will be available in all Inertia responses
    this.inertiaService.share({
      appName: 'DevKarti Blog',
      currentYear: new Date().getFullYear(),
    });
  }

  @Get()
  @Render('Home')
  async home() {
    const posts = await this.blogService.findFeatured();
    return { 
      posts,
      // Example of using Always decorator - this will always be included even in partial reloads
      meta: Always({
        title: 'Welcome to DevKarti',
        description: 'A modern blog built with NestJS and Inertia',
      }),
    };
  }

  @Get('posts')
  @Render('Posts')
  async posts() {
    const posts = await this.blogService.findAll();
    return { 
      posts,
      // Example of using Defer - this will load after initial render
      stats: Defer(async () => {
        // Simulate expensive calculation
        return {
          totalPosts: posts.length,
          lastUpdated: new Date().toISOString(),
        };
      }),
    };
  }

  @Get('posts/:slug')
  @Render('PostDetail')
  async postDetail(@Param('slug') slug: string) {
    const post = await this.blogService.findBySlug(slug);
    return { post };
  }

  @Get('tags')
  @Render('Tags')
  async tags() {
    const tags = await this.blogService.findAllTags();
    return { tags };
  }

  @Get('tags/:slug')
  @Render('Tags')
  async tagPosts(@Param('slug') slug: string) {
    const tag = await this.blogService.findTagBySlug(slug);
    const posts = await this.blogService.findByTag(slug);
    return { tag, posts };
  }

  @Get('search')
  @Render('Search')
  async search(@Query('q') query?: string) {
    const posts = query ? await this.blogService.search(query) : [];
    return { posts, query: query || '' };
  }

  @Get('about')
  @Render('About')
  about() {
    return {};
  }

  // API endpoints for admin
  @Post('api/posts')
  async create(@Body() createPostDto: CreatePostDto) {
    return this.blogService.create(createPostDto);
  }

  @Put('api/posts/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.blogService.update(+id, updatePostDto);
  }

  @Delete('api/posts/:id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
} 