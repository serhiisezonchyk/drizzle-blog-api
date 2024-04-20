import { Router } from 'express';
import UserPreferencesController from '../controllers/user-preferences.controller';

class UserPreferencesRoutes {
  router = Router();
  controller = new UserPreferencesController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/', this.controller.createUserPreference);
  }
}

export default new UserPreferencesRoutes().router;
