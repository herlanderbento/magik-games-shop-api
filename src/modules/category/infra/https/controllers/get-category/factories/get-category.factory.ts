import { prismaClient } from '~/@shared/infra';
import { GetCategoryUseCase } from '~/modules/category/application';
import { CategoryPrismaRepository } from '~/modules/category/infra/db';
import { GetCategoryController } from '../get-category.controller';

const repository = new CategoryPrismaRepository(prismaClient);

const useCase = new GetCategoryUseCase(repository);

export const getCategoryFactory = new GetCategoryController(useCase);
