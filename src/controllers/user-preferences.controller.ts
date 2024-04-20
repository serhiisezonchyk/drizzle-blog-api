import { Request, Response } from 'express';
import { db } from '../drizzle/db';
import { UserPreferences } from '../drizzle/schema';

export default class UserPreferencesController {
  async createUserPreference(req: Request, res: Response) {
    const { emailUpdates, userId } = req.body;
    try {
      await db.insert(UserPreferences).values({
        userId: userId,
        emailUpdates: Boolean(emailUpdates),
      });
      res.status(201).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
}
