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
    this.router.delete('/:id', this.controller.deletePost);
    this.router.post('/', this.controller.createPost);
    this.router.get('/:id', this.controller.getOne);
    this.router.put('/:id', this.controller.updatePost);
  }
}

export default new PostRoutes().router;
