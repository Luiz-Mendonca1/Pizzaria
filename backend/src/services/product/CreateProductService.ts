import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";
import {Readable} from "stream";

interface CreateProcuctServiceProps {
    name: string;
    description: string;
    price: number;
    category_id: string;
    imageBuffer: string; 
    imageName: string;
}

class CreateProductService {
    async execute({ name, description, price, category_id, imageBuffer, imageName }: CreateProcuctServiceProps) {
        // Implementation for creating a product

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: category_id,
            },
        });

        if (!categoryExists) {
            throw new Error('Category not found');
        }

        //envia para o cloudinary a img pega url
        let bannerUrl = '';

        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'products',
                        resource_type: 'image',
                        public_id: `${Date.now()}_${imageName.split('.')[0]}`,
                     },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );


        //salva a url e dados no banco de dados

        return { message: 'Product created successfully' };
    }
}

export { CreateProductService };