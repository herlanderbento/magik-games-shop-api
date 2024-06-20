import { prismaClient } from '~/@shared/infra';
import { UpdateCategoryUseCase } from '~/modules/category/application';
import { CategoryPrismaRepository } from '~/modules/category/infra/db';
import { UpdateCategoryController } from '../update-category.controller';

const repository = new CategoryPrismaRepository(prismaClient);

const useCase = new UpdateCategoryUseCase(repository);

export const updateCategoryFactory = new UpdateCategoryController(useCase);
