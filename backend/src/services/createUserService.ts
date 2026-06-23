class CreateUserService {
    async execute({ name, email, password }: { name: string; email: string; password: string }) {
        // Lógica para criar um usuário
        // Aqui você pode adicionar validações, hash de senha, etc.
        const user = { name,
            email,
            password, 
        };
        return user;
    }
}

export { CreateUserService };