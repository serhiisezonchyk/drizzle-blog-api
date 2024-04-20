import { Request, Response } from 'express';
import { db } from '../drizzle/db';
import { Category } from '../drizzle/schema';

export default class CategoriesController {
  async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    try {
      await db.insert(Category).values({
        name: name,
      });
      res.status(201).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const categories = await db.query.Category.findMany();
      res.status(201).json({ categories: categories });
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
}
