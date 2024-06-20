import { Router } from 'express';

import {
  createProductFactory,
  //   deleteProductFactory,
  //   getProductFactory,
  //   updateProductFactory,
  //  listProductFactory
} from '../controllers';

const productsRoutes = Router();

productsRoutes.post('/', (req, res) => createProductFactory.handle(req, res));
// productsRoutes.get('/', (req, res) => listProductFactory.handle(req, res));
// productsRoutes.get('/:id', (req, res) => getProductFactory.handle(req, res));
// productsRoutes.patch('/:id', (req, res) => updateProductFactory.handle(req, res));
// productsRoutes.delete('/:id', (req, res) => deleteProductFactory.handle(req, res));

export { productsRoutes };
