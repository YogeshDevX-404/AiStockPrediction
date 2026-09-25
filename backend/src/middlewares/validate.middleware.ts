import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstIssue = error.errors[0];
        const customMessage = firstIssue?.message || 'Validation failed';
        return res.status(400).json({
          success: false,
          message: customMessage,
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};
