import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import postRoutes from './post.routes';
import userPreferencesRoutes from './user-preferences.routes';
import userRoutes from './user.routes';

const router: Router = Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/user-preferences', userPreferencesRoutes);
router.use('/categories', categoriesRoutes);

export default router;
