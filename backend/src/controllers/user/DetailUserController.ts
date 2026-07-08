import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

// Busca os dados do usuário já autenticado pelo middleware.
class DetailUserController {
    async handle(req: Request, res: Response) {
        try {
            // O middleware já validou o token e guardou o id do usuário
            if (!req.user_id) {
                return res.status(401).json({ error: 'Token missing' });
            }

            const detailUserService = new DetailUserService();
            const user = await detailUserService.execute(req.user_id);
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            return res.status(404).json({ message: 'User not found' });
        }
    }
}

export { DetailUserController };