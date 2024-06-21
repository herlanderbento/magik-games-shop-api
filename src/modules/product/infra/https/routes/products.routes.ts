import { Router } from 'express';

import {
  createProductFactory,
  listProductFactory,
    deleteProductFactory,
    getProductFactory,
    updateProductFactory,
} from '../controllers';

const productsRoutes = Router();

productsRoutes.post('/', (req, res) => createProductFactory.handle(req, res));
productsRoutes.get('/', (req, res) => listProductFactory.handle(req, res));
productsRoutes.get('/:slug', (req, res) => getProductFactory.handle(req, res));
productsRoutes.put('/:id', (req, res) => updateProductFactory.handle(req, res));
productsRoutes.delete('/:productId', (req, res) => deleteProductFactory.handle(req, res));

export { productsRoutes };
