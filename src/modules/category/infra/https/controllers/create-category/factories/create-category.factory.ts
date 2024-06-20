import { prismaClient } from '~/@shared/infra';
import { CreateCategoryUseCase } from '~/modules/category/application';
import { CategoryPrismaRepository } from '~/modules/category/infra/db';
import { CreateCategoryController } from '../create-category.controller';

const repository = new CategoryPrismaRepository(prismaClient);

const useCase = new CreateCategoryUseCase(repository);

export const createCategoryFactory = new CreateCategoryController(useCase);
