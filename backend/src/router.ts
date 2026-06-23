import {Router} from 'express';
import {CreateUserController} from './controllers/user/createUserController';

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', (req, res) => createUserController.handle(req, res));

export default router;