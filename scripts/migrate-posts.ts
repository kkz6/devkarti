import { DataSource } from 'typeorm';
import { Post } from '../src/database/entities/post.entity';
import { Tag } from '../src/database/entities/tag.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import slugify from 'slugify';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'devkarti',
  entities: [Post, Tag],
  synchronize: true,
});

async function migratePosts() {
  await dataSource.initialize();
  
  const postRepository = dataSource.getRepository(Post);
  const tagRepository = dataSource.getRepository(Tag);
  
  const postsDir = path.join(__dirname, '../astro-backup/src/content/blog');
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    console.log(`Migrating: ${frontmatter.title}`);
    
    // Create or find tags
    const tags = [];
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      for (const tagName of frontmatter.tags) {
        const tagSlug = slugify(tagName, { lower: true, strict: true });
        let tag = await tagRepository.findOne({ where: { slug: tagSlug } });
        
        if (!tag) {
          tag = tagRepository.create({
            name: tagName,
            slug: tagSlug,
          });
          await tagRepository.save(tag);
        }
        
        tags.push(tag);
      }
    }
    
    // Create post
    const post = postRepository.create({
      title: frontmatter.title,
      slug: frontmatter.slug || slugify(frontmatter.title, { lower: true, strict: true }),
      author: frontmatter.author || 'Karthick', // Use default author if not specified
      content: content,
      description: frontmatter.description,
      ogImage: frontmatter.ogImage,
      featured: frontmatter.featured || false,
      draft: frontmatter.draft || false,
      canonicalURL: frontmatter.canonicalURL,
      pubDatetime: new Date(frontmatter.pubDatetime),
      modDatetime: frontmatter.modDatetime ? new Date(frontmatter.modDatetime) : undefined,
      tags: tags,
    });
    
    await postRepository.save(post);
    console.log(`✓ Migrated: ${frontmatter.title}`);
  }
  
  console.log('\nMigration completed!');
  await dataSource.destroy();
}

migratePosts().catch(console.error); 