import { Router } from 'express';
import PostController from '../controllers/post.controller';

class PostRoutes {
  router = Router();
  controller = new PostController();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get('/', this.controller.getAll);
  }
}

export default new PostRoutes().router;
