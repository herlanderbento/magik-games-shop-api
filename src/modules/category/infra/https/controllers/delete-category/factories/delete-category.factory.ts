import { prismaClient } from '~/@shared/infra';
import { DeleteCategoryUseCase } from '~/modules/category/application';
import { CategoryPrismaRepository } from '~/modules/category/infra/db';
import { DeleteCategoryController } from '../delete-category.controller';

const repository = new CategoryPrismaRepository(prismaClient);

const useCase = new DeleteCategoryUseCase(repository);

export const deleteCategoryFactory = new DeleteCategoryController(useCase);
