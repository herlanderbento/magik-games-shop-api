import { Request, Response } from 'express';
import { ListCategoriesUseCase } from '~/modules/category/application';
import { StatusCodes } from 'http-status-codes';
import { listCategoriesValidated } from './validator/list-categories.validator';
import { sendErrorResponse } from '~/@shared/domain';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await listCategoriesValidated(request);

      const output = await this.listCategoriesUseCase.execute(input);

      return response.status(StatusCodes.OK).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
