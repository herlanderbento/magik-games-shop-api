import { prismaClient } from '~/@shared/infra';
import { DeleteProductUseCase } from '~/modules/product/application';
import { ProductPrismaRepository } from '~/modules/product/infra/db';
import { DeleteProductController } from '../delete-product.controller';

const repository = new ProductPrismaRepository(prismaClient);

const useCase = new DeleteProductUseCase(repository);

export const deleteProductFactory = new DeleteProductController(useCase);
