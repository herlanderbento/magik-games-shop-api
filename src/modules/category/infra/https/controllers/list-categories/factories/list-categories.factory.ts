import { prismaClient } from '~/@shared/infra';
import { ListCategoriesUseCase } from '~/modules/category/application';
import { CategoryPrismaRepository } from '~/modules/category/infra/db';
import { ListCategoriesController } from '../list-categories.controller';


const repository = new CategoryPrismaRepository(prismaClient);

const useCase = new ListCategoriesUseCase(repository);

export const listCategoriesFactory = new ListCategoriesController(useCase);
