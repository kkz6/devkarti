import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Post } from '../database/entities/post.entity';
import { Tag } from '../database/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag])],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {} 