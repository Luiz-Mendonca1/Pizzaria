import {Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price, category_id } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }

        console.log("===============================")
        console.log(req.file);
        console.log("===============================")
        const createProduct = new CreateProductService();

        const product = await createProduct.execute();
        res.status(201).json(product);
    }
}

export { CreateProductController };