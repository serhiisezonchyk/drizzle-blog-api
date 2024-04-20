import { Request, Response } from 'express';

export default class PostController {
  async getAll(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: 'Okey',
      });
    } catch (error) {}
  }
}
