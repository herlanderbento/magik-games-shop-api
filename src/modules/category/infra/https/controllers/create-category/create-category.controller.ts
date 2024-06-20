import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '~/modules/category/application';
import { createCategoryValidated } from './validator/create-category.validator';
import { StatusCodes } from 'http-status-codes';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await createCategoryValidated(request);

      const output = await this.createCategoryUseCase.execute(input);

      return response.status(StatusCodes.CREATED).json({ data: output });
    } catch (err: any) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
  }
}
