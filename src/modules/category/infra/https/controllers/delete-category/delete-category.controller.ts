import { Request, Response } from 'express';
import { DeleteCategoryUseCase } from '~/modules/category/application';
import { StatusCodes } from 'http-status-codes';
import { deleteCategoryValidated } from './validator';
import { sendErrorResponse } from '~/@shared/domain';

export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await deleteCategoryValidated(request);

      const output = await this.deleteCategoryUseCase.execute(input);

      return response.status(StatusCodes.NO_CONTENT).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
