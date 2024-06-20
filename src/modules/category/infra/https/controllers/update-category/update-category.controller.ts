import { Request, Response } from 'express';
import { UpdateCategoryUseCase } from '~/modules/category/application';
import { StatusCodes } from 'http-status-codes';
import { updateCategoryValidated } from './validator/update-category.validator';
import { sendErrorResponse } from '~/@shared/domain';

export class UpdateCategoryController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await updateCategoryValidated(request);

      const output = await this.updateCategoryUseCase.execute(input);

      return response.status(StatusCodes.OK).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
