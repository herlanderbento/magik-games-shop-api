import { prismaClient } from '~/@shared/infra';
import {  GetProductUseCase } from '~/modules/product/application';
import { ProductPrismaRepository } from '~/modules/product/infra/db';
import { GetProductController } from '../get-product.controller';
import { CategoryPrismaRepository } from '~/modules/category/infra';

const productRepository = new ProductPrismaRepository(prismaClient);
const categoryRepository = new CategoryPrismaRepository(prismaClient);

const useCase = new GetProductUseCase(productRepository, categoryRepository);

export const getProductFactory = new GetProductController(useCase);
