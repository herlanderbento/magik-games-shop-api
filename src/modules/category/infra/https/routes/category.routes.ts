import { Router } from 'express';
import {
  createCategoryFactory,
  deleteCategoryFactory,
  getCategoryFactory,
  listCategoriesFactory,
  updateCategoryFactory,
} from '../controllers';

const categoryRoutes = Router();

categoryRoutes.post('/', (req, res) => createCategoryFactory.handle(req, res));
categoryRoutes.get('/', (req, res) => listCategoriesFactory.handle(req, res));
categoryRoutes.get('/:categoryId', (req, res) => getCategoryFactory.handle(req, res));
categoryRoutes.put('/:categoryId', (req, res) => updateCategoryFactory.handle(req, res));
categoryRoutes.delete('/:categoryId', (req, res) => deleteCategoryFactory.handle(req, res));

export { categoryRoutes };
