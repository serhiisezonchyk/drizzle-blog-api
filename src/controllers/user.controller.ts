import 'dotenv/config';
import { asc, eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../drizzle/db';
import { User } from './../drizzle/schema';

export default class UserController {
  async createUser(req: Request, res: Response) {
    const { name, age, email } = req.body;
    try {
      const user = await db
        .insert(User)
        .values({
          name: name,
          age: +age,
          email: email,
        })
        .returning();
      res.status(201).json({ user: user.at(0) });
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const users = await db.query.User.findMany();
      res.status(201).json({ users: users });
    } catch (err) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async getAllEmails(req: Request, res: Response) {
    try {
      const users = await db.query.User.findMany({
        columns: {
          email: true,
          id: true,
        },
        orderBy: asc(User.name),
        // Return only First n object
        // limit:n

        // Skip first n objects
        // offset:n
        with: {
          // For all
          // preferences: true,

          preferences: {
            columns: {
              emailUpdates: true,
            },
          },
        },
      });
      res.status(201).json({ users: users });
    } catch (err) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    try {
      const user = await db.query.User.findMany({
        where: eq(User.id, id as string),
        with: {
          posts: {
            with: {
              postCategories: {
                with: {
                  category: {
                    columns: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.status(201).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
}
