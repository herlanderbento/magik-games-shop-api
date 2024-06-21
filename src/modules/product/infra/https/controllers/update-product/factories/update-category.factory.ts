import { prismaClient } from '~/@shared/infra';
import { UpdateProductUseCase } from '~/modules/product/application';
import { ProductPrismaRepository } from '~/modules/product/infra/db';
import { UpdateProductsController } from '../update-products.controller';
import { CategoryPrismaRepository } from '~/modules/category/infra';

const productRepository = new ProductPrismaRepository(prismaClient);
const categoryRepository = new CategoryPrismaRepository(prismaClient);

const useCase = new UpdateProductUseCase(productRepository, categoryRepository);

export const updateProductFactory = new UpdateProductsController(useCase);
