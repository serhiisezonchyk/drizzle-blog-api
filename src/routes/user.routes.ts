import { Router } from 'express';
import UserController from '../controllers/user.controller';

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get('/', this.controller.getAll);
    this.router.post('/', this.controller.createUser);
    this.router.get('/emails', this.controller.getAllEmails)
    this.router.get('/:id',this.controller.getOne)
  }
}

export default new UserRoutes().router;
