import prismaClient from "../../prisma/index";
import bcrypt from "bcryptjs";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}

// Lógica para criar um usuário
class CreateUserService {
    async execute({ name, email, password }: CreateUserProps) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new AppError("Este e-mail já foi cadastrado.", 409);
        }

        const passwordHash = await bcrypt.hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                created_at: true,
            }
        });
        return user;
    }
}

export { CreateUserService };