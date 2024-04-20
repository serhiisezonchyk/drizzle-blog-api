import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../drizzle/db';
import { Post } from '../drizzle/schema';
import { PostCategory } from './../drizzle/schema';

export default class PostController {
  async getAll(req: Request, res: Response) {
    try {
      const posts = await db.query.Post.findMany({
        columns: {
          id: true,
          title: true,
          avarageRating: true,
        },
        with: {
          user: {
            columns: {
              name: true,
            },
          },
          postCategories: {
            columns: {},
            with: {
              category: true,
            },
          },
        },
      });
      res.status(201).json({ posts: posts });
    } catch (err) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await db.query.Post.findFirst({
        columns: {
          userId: false,
        },
        with: {
          user: true,
          postCategories: {
            columns:{ },
            with: {
              category: true,
            },
          },
        },
        where: eq(Post.id, id as string),
      });
      res.status(201).json({ post: post });
    } catch (err) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async createPost(req: Request, res: Response) {
    const { title, userId, categories } = req.body;
    try {
      const newPost = await db
        .insert(Post)
        .values({
          title: title,
          userId: userId,
        })
        .returning();

      if (!newPost || newPost.length === 0 || !newPost.at(0)) {
        throw new Error('Failed to create newPost');
      }

      const newPostId = newPost.at(0)?.id as string;
      // If categories are provided, associate them with the post
      if (categories && categories.length > 0) {
        await Promise.all(
          categories.map(async (categoryId: string) => {
            await db
              .insert(PostCategory)
              .values({
                postId: newPostId,
                categoryId: categoryId,
              })
              .execute();
          }),
        );
      }
      const post = await db.query.Post.findFirst({
        where: eq(Post.id, newPostId),
        columns: {
          userId: false,
        },
        with: {
          postCategories: {
            columns:{ },
            with: {
              category: true,
            },
          },
        },
      });
      res.status(201).json({ post: post });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, categories } = req.body;
    try {
      await db
        .delete(PostCategory)
        .where(eq(PostCategory.postId, id as string))
        .execute();

      if (categories && categories.length > 0) {
        await Promise.all(
          categories.map(async (categoryId: string) => {
            await db
              .insert(PostCategory)
              .values({
                postId: id as string,
                categoryId: categoryId,
              })
              .execute();
          }),
        );
      }
      const post = await db
        .update(Post)
        .set({
          title: title,
          updatedAt: new Date(),
        })
        .where(eq(Post.id, id as string))
        .returning();
      res.status(201).json({ post: post.at(0) });
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db.delete(Post).where(eq(Post.id, id as string));
      res.status(201).json({ message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'something went wrong' });
    }
  }
}
