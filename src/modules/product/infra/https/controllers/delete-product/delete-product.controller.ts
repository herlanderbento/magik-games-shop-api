import { Request, Response } from 'express';
import { DeleteProductUseCase } from '~/modules/product/application';
import { StatusCodes } from 'http-status-codes';
import { deleteProductValidated } from './validator';
import { sendErrorResponse } from '~/@shared/domain';

export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // try {
    //   const input = await deleteProductValidated(request);

    //   await this.deleteProductUseCase.execute(input);

    //   return response.status(StatusCodes.NO_CONTENT).send();
    // } catch (err) {
    //   return sendErrorResponse(err, response);
    // }

    const input = await deleteProductValidated(request);

    await this.deleteProductUseCase.execute(input);

    return response.status(StatusCodes.NO_CONTENT).send();
  }
}
