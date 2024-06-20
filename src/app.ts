import 'reflect-metadata';
import 'express-async-errors';
import './@shared/infra/configs/env';
import './@shared/infra/configs/module-alias';

import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from './docs/swagger.json'

import { errors } from './@shared/domain';
import { versions, router } from './@shared/infra';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/v1/swagger', (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + '/src/_docs/swagger.json');
});

app.get('/v1/docs', (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + '/src/_docs/index.html');
});

app.use(versions.current, router);
app.use(errors);

export default app;
