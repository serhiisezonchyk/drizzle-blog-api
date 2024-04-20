import { Request, Response } from 'express';

export default class UserController {
  async findAll(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: 'findAll OK',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }
}
