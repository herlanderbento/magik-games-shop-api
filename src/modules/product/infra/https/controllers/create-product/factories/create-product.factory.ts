import { prismaClient } from '~/@shared/infra';
import { CreateProductUseCase } from '~/modules/product/application';
import { ProductPrismaRepository } from '~/modules/product/infra/db';
import { CreateProductController } from '../create-product.controller';
import { CategoryPrismaRepository } from '~/modules/category/infra';

const productRepository = new ProductPrismaRepository(prismaClient);
const categoryRepository = new CategoryPrismaRepository(prismaClient);

const useCase = new CreateProductUseCase(productRepository, categoryRepository);

export const createProductFactory = new CreateProductController(useCase);
