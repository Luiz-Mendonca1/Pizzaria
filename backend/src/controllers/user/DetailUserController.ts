import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { DetailUserService } from '../../services/user/DetailUserService';

// identificar detalhes do usuário logado usando o jwt token fornecido no cabeçalho de autorização da solicitação. O controlador extrai o token, verifica sua validade e, em seguida, chama o serviço de detalhes do usuário para recuperar as informações do usuário correspondente. Se o token estiver ausente ou inválido, ele retorna uma resposta de erro apropriada.
class DetailUserController {
    async handle(req: Request, res: Response) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const [, token] = authHeader.split(' ');

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        try {
            const { sub: user_id } = verify(token, process.env.JWT_SECRET as string) as { sub: string };
            const detailUserService = new DetailUserService();
            const user = await detailUserService.execute(user_id);
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error retrieving user details:', error);

            if (error instanceof Error && error.message === 'jwt malformed') {
                return res.status(401).json({ error: 'Invalid token' });
            }

            return res.status(404).json({ message: 'User not found' });
        }
    }
}

export { DetailUserController };