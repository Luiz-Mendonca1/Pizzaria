import {Router} from 'express';
import {CreateUserController} from './controllers/user/createUserController';
import { createUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', validateSchema(createUserSchema), (req, res) => createUserController.handle(req, res));

export default router;