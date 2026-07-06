import {Router} from 'express';
import {CreateUserController} from './controllers/user/createUserController';
import { authUserSchema, createUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';
import { AuthUserController } from './controllers/user/AuthUserController';

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', validateSchema(createUserSchema), (req, res) => createUserController.handle(req, res));

const authUserController = new AuthUserController();
router.post('/session', validateSchema(authUserSchema), (req, res) => authUserController.handle(req, res));

export default router;