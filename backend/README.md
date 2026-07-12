# Contexto Backend

## Arquitetura

O projeto segue uma arquitetura simples de camadas:

- Rotas > Controllers > Services
- O `router` define os endpoints e aplica middlewares.
- O `Controller` recebe a requisição, extrai dados e chama o `Service`.
- O `Service` contém a lógica de negócio, faz a operação no banco com o Prisma e retorna o resultado ao `Controller`.
- O `Controller` retorna a resposta ao usuário.

## Organização de pastas

- `src/`
  - `server.ts` - inicializa o Express, configura middlewares gerais e registra rotas.
  - `routes.ts` - define os endpoints e usa controllers e validações.
  - `controllers/` - lógica de controle de requisição e resposta.
    - `user/`
      - `CreateUserController.ts`
      - `AuthUserController.ts`
      - `DetailUserController.ts`
    - `category/`
      - `CreateCategoryController.ts`
  - `services/` - lógica de negócio e acesso ao banco.
    - `user/`
      - `CreateUserService.ts`
      - `AuthUserService.ts`
      - `DetailUserService.ts`
    - `category/`
      - `CreateCategoryService.ts`
  - `schemas/` - validação de entrada com Zod.
    - `userSchema.ts`
    - `categorySchema.ts`
  - `middlewares/` - middlewares de validação e autenticação.
    - `validateSchema.ts`
    - `isAuthenticated.ts`
    - `isAdmin.ts`
  - `prisma/`
    - `index.ts` - instancia o Prisma Client com adapter PostgreSQL.
  - `generated/prisma/` - cliente Prisma gerado.

## Endpoints

- `POST /users`
  - Validação: `createUserSchema`
  - Controller: `CreateUserController`
  - Service: `CreateUserService`
  - Função: criar novo usuário.

- `POST /session`
  - Validação: `authUserSchema`
  - Controller: `AuthUserController`
  - Service: `AuthUserService`
  - Função: autenticar usuário e gerar token JWT.

- `GET /me`
  - Middleware: `isAuthenticated`
  - Controller: `DetailUserController`
  - Service: `DetailUserService`
  - Função: retornar dados do usuário autenticado.

- `POST /category`
  - Middlewares: `isAuthenticated`, `isAdmin`
  - Validação: `createCategorySchema`
  - Controller: `CreateCategoryController`
  - Service: `CreateCategoryService`
  - Função: criar nova categoria.

## Modelagem do banco de dados (Prisma)

Modelos principais:

### User
- `id: String @id @default(uuid())`
- `name: String`
- `email: String @unique`
- `password: String`
- `role: Role @default(STAFF)`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`
- Mapeado para tabela `users`.

### Category
- `id: String @id @default(uuid())`
- `name: String @unique`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`
- Relação `products: Product[]`
- Mapeado para tabela `categories`.

### Product
- `id: String @id @default(uuid())`
- `name: String`
- `price: Float`
- `description: String`
- `banner: String`
- `disabled: Boolean @default(false)`
- `categoryId: String`
- `category: Category @relation(...)`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`
- `items: Item[]`
- Mapeado para tabela `products`.

### Order
- `id: String @id @default(uuid())`
- `table: Int`
- `status: Boolean @default(false)`
- `draft: Boolean @default(true)`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`
- `items: Item[]`
- Mapeado para tabela `orders`.

### Item
- `id: String @id @default(uuid())`
- `amount: Int`
- `orderId: String`
- `productId: String`
- `name: String?`
- `order: Order @relation(...)`
- `product: Product @relation(...)`
- `createdAt: DateTime @default(now())`
- `updatedAt: DateTime @updatedAt`
- Mapeado para tabela `items`.

### Enum
- `Role` com valores `STAFF` e `ADMIN`.

## Validação de schema

Validação é feita com `zod` e `validateSchema` usa `schema.parseAsync(...)` para validar:

- `createUserSchema`
  - `name`: string, mínimo 1 caractere.
  - `email`: string, formato de email.
  - `password`: string, mínimo 6 caracteres.

- `authUserSchema`
  - `email`: string, formato de email.
  - `password`: string, mínimo 6 caracteres.

- `createCategorySchema`
  - `name`: string, mínimo 1 caractere.

Se a validação falhar, retorna status `400` com lista de `field` e `message`.

## Bibliotecas e versões

- `@prisma/adapter-pg`: ^7.8.0
- `@prisma/client`: ^7.8.0
- `bcryptjs`: ^3.0.3
- `cors`: ^2.8.6
- `dotenv`: ^17.4.2
- `express`: ^5.2.1
- `jsonwebtoken`: ^9.0.3
- `pg`: ^8.22.0
- `tsx`: ^4.22.4
- `zod`: ^4.4.3

Dev dependencies:
- `@types/cors`: ^2.8.19
- `@types/dotenv`: ^6.1.1
- `@types/express`: ^5.0.6
- `@types/jsonwebtoken`: ^9.0.10
- `@types/node`: ^25.9.4
- `@types/pg`: ^8.20.0
- `prisma`: ^7.8.0
- `typescript`: ^6.0.3

## Fluxo geral

1. Requisição chega em `routes.ts`.
2. Validação de schema e middlewares são executados.
3. Controller chama o Service.
4. Service usa `prismaClient` para acessar o banco.
5. Resultado retorna ao Controller.
6. Controller envia resposta JSON ao cliente.
