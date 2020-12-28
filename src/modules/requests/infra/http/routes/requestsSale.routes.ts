import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SaleRequestsController from '../controllers/SaleRequestsController';

const requestsSale = Router();
const saleRequestsController = new SaleRequestsController();

requestsSale.post(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  saleRequestsController.create,
);

requestsSale.put(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required().allow(null, ''),
    },
  }),
  saleRequestsController.update,
);

requestsSale.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  saleRequestsController.show,
);

export default requestsSale;
