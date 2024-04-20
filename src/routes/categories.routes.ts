import { Router } from 'express';
import CategoriesController from '../controllers/categories.controller';

class CategoriesRoutes {
  router = Router();
  controller = new CategoriesController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get('/', this.controller.getAll);
    this.router.post('/', this.controller.createCategory);
  }
}

export default new CategoriesRoutes().router;
