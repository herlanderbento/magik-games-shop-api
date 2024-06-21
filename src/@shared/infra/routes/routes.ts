import { Router } from 'express';
import { categoryRoutes } from '../../../modules/category/infra';
import { productsRoutes } from '~/modules/product/infra';
import { usersRoutes } from '~/modules/account/infra/http/routes/user.routes';

const router = Router();

router.get('/', (_, res) => {
  return res.json('magik games shop is running');
});

router.use('/categories', categoryRoutes);
router.use('/products', productsRoutes);
router.use('/users', usersRoutes)

export { router };
