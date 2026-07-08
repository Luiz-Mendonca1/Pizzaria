import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Pega o token do cabeçalho de autorização
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token missing' });
    }

    const [scheme, token] = authHeader.split(' ');

    // Espera o formato: Bearer <token>
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    try {
        // Valida o token e pega o id do usuário
        const { sub: user_id } = verify(token, process.env.JWT_SECRET as string) as Payload;

        // Guarda o id no request para o próximo passo
        req.user_id = user_id;
        return next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}