import { Request, Response } from 'express';
import { GetCategoryUseCase } from '~/modules/category/application';
import { StatusCodes } from 'http-status-codes';
import { getCategoryValidated } from './validator';
import { sendErrorResponse } from '~/@shared/domain';

export class GetCategoryController {
  constructor(private getCategoryUseCase: GetCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await getCategoryValidated(request);

      const output = await this.getCategoryUseCase.execute(input);

      return response.status(StatusCodes.OK).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
