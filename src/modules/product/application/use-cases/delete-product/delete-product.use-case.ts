import { IUseCase } from '~/@shared/application';
import { NotFoundError } from '~/@shared/domain';
import { IProductRepository, Product } from '~/modules/product/domain';

interface DeleteProductInput {
  productId: string;
}

type DeleteProductOutput = void;

export class DeleteProductUseCase
  implements IUseCase<DeleteProductInput, DeleteProductOutput>
{
  constructor(private productRepository: IProductRepository) {}

  async execute(input: DeleteProductInput): Promise<DeleteProductOutput> {
    const product = await this.productRepository.findById(input.productId);

    if (!product) {
      throw new NotFoundError(input.productId, Product);
    }

    await this.productRepository.delete(input.productId);
  }
}
