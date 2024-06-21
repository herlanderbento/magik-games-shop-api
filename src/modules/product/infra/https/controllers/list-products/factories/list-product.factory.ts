import { prismaClient } from '~/@shared/infra';
import { ListProductsUseCase } from '~/modules/product/application';
import { ProductPrismaRepository } from '~/modules/product/infra/db';
import { ListProductsController } from '../list-products.controller';
import { CategoryPrismaRepository } from '~/modules/category/infra';


const repository = new ProductPrismaRepository(prismaClient);
const categoryRepository = new CategoryPrismaRepository(prismaClient)

const useCase = new ListProductsUseCase(repository, categoryRepository);

export const listProductFactory = new ListProductsController(useCase);
