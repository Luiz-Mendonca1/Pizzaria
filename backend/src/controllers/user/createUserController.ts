import {Request, Response} from 'express';
import {CreateUserService} from '../../services/user/createUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        console.log('Request body:', req.body);

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({ name, email, password });
            console.log('User created:', user);
            return res.status(201).json({
                message: 'User created successfully!',
                user: user
            });
        } catch (error) {
            console.error('Error creating user:', error);

            if (error instanceof Error && 'statusCode' in error) {
                const statusCode = Number((error as Error & { statusCode?: number }).statusCode || 500);
                return res.status(statusCode).json({ error: error.message });
            }

            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

export { CreateUserController };