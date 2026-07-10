// CreateCategoryController serve para lidar com a criação de novas categorias. Ele recebe uma requisição HTTP, extrai o nome da categoria do corpo da requisição e utiliza o serviço CreateCategoryService para criar a categoria no banco de dados. Se a criação for bem-sucedida, retorna um status 201 com os detalhes da categoria criada. Caso ocorra algum erro, retorna um status 400 com a mensagem de erro correspondente.
import {Request, Response} from 'express';
import {CreateCategoryService} from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const createCategory = new CreateCategoryService();

        try {
            const category = await createCategory.execute({ name });
            return res.status(201).json(category);
        } catch (error) {
            console.error('Error creating category:', error);
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Failed to create category.' });
        }
    }
}

export { CreateCategoryController };