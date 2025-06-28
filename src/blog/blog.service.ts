import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../database/entities/post.entity';
import { Tag } from '../database/entities/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, tag?: string) {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('post.draft = :draft', { draft: false })
      .orderBy('post.pubDatetime', 'DESC');

    if (tag) {
      query.andWhere('tag.slug = :tagSlug', { tagSlug: tag });
    }

    const [posts, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      posts,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(slug: string) {
    const post = await this.postRepository.findOne({
      where: { slug },
      relations: ['tags'],
    });

    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }

    return post;
  }

  async create(createPostDto: CreatePostDto) {
    const { tags: tagNames, ...postData } = createPostDto;
    
    const post = this.postRepository.create({
      ...postData,
      slug: slugify(postData.title, { lower: true, strict: true }),
    });

    if (tagNames && tagNames.length > 0) {
      const tags = await Promise.all(
        tagNames.map(async (name) => {
          const slug = slugify(name, { lower: true, strict: true });
          let tag = await this.tagRepository.findOne({ where: { slug } });
          
          if (!tag) {
            tag = this.tagRepository.create({ name, slug });
            await this.tagRepository.save(tag);
          }
          
          return tag;
        }),
      );
      
      post.tags = tags;
    }

    return this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { tags: tagNames, ...postData } = updatePostDto;
    
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    Object.assign(post, postData);

    if (postData.title) {
      post.slug = slugify(postData.title, { lower: true, strict: true });
    }

    if (tagNames) {
      const tags = await Promise.all(
        tagNames.map(async (name) => {
          const slug = slugify(name, { lower: true, strict: true });
          let tag = await this.tagRepository.findOne({ where: { slug } });
          
          if (!tag) {
            tag = this.tagRepository.create({ name, slug });
            await this.tagRepository.save(tag);
          }
          
          return tag;
        }),
      );
      
      post.tags = tags;
    }

    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const result = await this.postRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async getAllTags() {
    return this.tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.posts', 'post')
      .where('post.draft = :draft', { draft: false })
      .select(['tag.id', 'tag.name', 'tag.slug'])
      .addSelect('COUNT(post.id)', 'postCount')
      .groupBy('tag.id')
      .getRawMany();
  }
} 