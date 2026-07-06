interface AuthUserServiceProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthUserServiceProps) {
        // Lógica para autenticar o usuário
        console.log('Authenticating user with email:', email, 'and password:', password);
        return { message: 'User authenticated successfully!' };
    }
}

export { AuthUserService };