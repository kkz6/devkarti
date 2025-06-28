import { IsString, IsBoolean, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  ogImage?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  draft?: boolean;

  @IsOptional()
  @IsUrl()
  canonicalURL?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
} 