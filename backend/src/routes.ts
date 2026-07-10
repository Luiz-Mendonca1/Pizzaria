import {Router} from 'express';
import {CreateUserController} from './controllers/user/CreateUserController';
import { authUserSchema, createUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', validateSchema(createUserSchema), (req, res) => createUserController.handle(req, res));

const authUserController = new AuthUserController();
router.post('/session', validateSchema(authUserSchema), (req, res) => authUserController.handle(req, res));

const detailUserController = new DetailUserController();
router.get('/me', isAuthenticated, (req, res) => detailUserController.handle(req, res));

const createCategoryController = new CreateCategoryController();
router.post('/category', isAuthenticated, (req, res) => createCategoryController.handle(req, res));

export default router;