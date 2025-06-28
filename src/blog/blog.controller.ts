import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InertiaInterceptor } from '../inertia/inertia.interceptor';

@Controller()
@UseInterceptors(InertiaInterceptor)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async home() {
    const { posts } = await this.blogService.findAll(1, 4);
    return {
      component: 'Home',
      props: { posts }
    };
  }

  @Get('posts')
  async index(
    @Query('page') page: string = '1',
    @Query('tag') tag?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const data = await this.blogService.findAll(pageNumber, 10, tag);
    return {
      component: 'Posts',
      props: data
    };
  }

  @Get('posts/:slug')
  async show(@Param('slug') slug: string) {
    const post = await this.blogService.findOne(slug);
    return {
      component: 'PostDetail',
      props: { post }
    };
  }

  @Get('tags')
  async tags() {
    const tags = await this.blogService.getAllTags();
    return {
      component: 'Tags',
      props: { tags }
    };
  }

  @Get('search')
  async search() {
    const { posts } = await this.blogService.findAll(1, 100);
    return {
      component: 'Search',
      props: { posts }
    };
  }

  @Get('about')
  async about() {
    return {
      component: 'About',
      props: {}
    };
  }

  // API endpoints for admin panel (future implementation)
  @Post('api/posts')
  create(@Body() createPostDto: CreatePostDto) {
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