import { Router } from 'express';
import { createUserFactory } from '../controllers';

const usersRoutes = Router({ mergeParams: true });

usersRoutes.post('/', (req, res) => createUserFactory.handle(req, res));

export { usersRoutes };
