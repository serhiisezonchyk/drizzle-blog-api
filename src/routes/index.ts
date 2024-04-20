import { Router } from 'express';
import postRoutes from './post.routes';
import userRoutes from './user.routes';

const router: Router = Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);

export default router;
