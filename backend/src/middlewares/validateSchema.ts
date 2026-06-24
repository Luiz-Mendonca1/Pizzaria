import { ZodError, ZodType } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validateSchema = (schema: ZodType): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query
            });

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    errors: 'validation failed',
                    details: error.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };