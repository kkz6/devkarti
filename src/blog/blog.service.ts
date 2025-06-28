import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      where: { draft: false },
      relations: ['tags'],
      order: { pubDatetime: 'DESC' },
    });
  }

  async findFeatured(): Promise<Post[]> {
    return this.postRepository.find({
      where: { featured: true, draft: false },
      relations: ['tags'],
      order: { pubDatetime: 'DESC' },
      take: 4,
    });
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { slug },
      relations: ['tags'],
    });
    
    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }
    
    return post;
  }

  async findByTag(tagSlug: string): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('tag.slug = :tagSlug', { tagSlug })
      .andWhere('post.draft = :draft', { draft: false })
      .orderBy('post.pubDatetime', 'DESC')
      .getMany();
  }

  async findAllTags(): Promise<Tag[]> {
    return this.tagRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findTagBySlug(slug: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { slug },
    });
    
    if (!tag) {
      throw new NotFoundException(`Tag with slug "${slug}" not found`);
    }
    
    return tag;
  }

  async search(query: string): Promise<Post[]> {
    return this.postRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { content: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
      relations: ['tags'],
      order: { pubDatetime: 'DESC' },
    });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
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

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
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

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
} 