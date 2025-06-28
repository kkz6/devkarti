import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InertiaService, InertiaHelper } from '../inertia';

@Controller()
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly inertiaService: InertiaService,
  ) {}

  private getInertia(req: Request, res: Response): InertiaHelper {
    return new InertiaHelper(this.inertiaService, req, res);
  }

  @Get()
  async home(@Req() req: Request, @Res() res: Response) {
    const posts = await this.blogService.findFeatured();
    const inertia = this.getInertia(req, res);
    inertia.render('Home', { posts });
  }

  @Get('posts')
  async posts(@Req() req: Request, @Res() res: Response) {
    const posts = await this.blogService.findAll();
    const inertia = this.getInertia(req, res);
    inertia.render('Posts', { posts });
  }

  @Get('posts/:slug')
  async postDetail(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
    const post = await this.blogService.findBySlug(slug);
    const inertia = this.getInertia(req, res);
    inertia.render('PostDetail', { post });
  }

  @Get('tags')
  async tags(@Req() req: Request, @Res() res: Response) {
    const tags = await this.blogService.findAllTags();
    const inertia = this.getInertia(req, res);
    inertia.render('Tags', { tags });
  }

  @Get('tags/:slug')
  async tagPosts(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
    const tag = await this.blogService.findTagBySlug(slug);
    const posts = await this.blogService.findByTag(slug);
    const inertia = this.getInertia(req, res);
    inertia.render('Tags', { tag, posts });
  }

  @Get('search')
  async search(@Req() req: Request, @Res() res: Response) {
    const query = req.query.q as string;
    const posts = query ? await this.blogService.search(query) : [];
    const inertia = this.getInertia(req, res);
    inertia.render('Search', { posts, query: query || '' });
  }

  @Get('about')
  about(@Req() req: Request, @Res() res: Response) {
    const inertia = this.getInertia(req, res);
    inertia.render('About', {});
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