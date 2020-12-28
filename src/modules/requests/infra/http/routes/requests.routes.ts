import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RequestController from '../controllers/RequestController';
import RequestUserController from '../controllers/RequestUserController';

const requestsRoutes = Router();
const requestController = new RequestController();
const requestUserController = new RequestUserController();

requestsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      contact_type_id: Joi.number().required(),
      contact: Joi.string().required(),
      description: Joi.string().required(),
      request_type: Joi.number().required(),
      alert: Joi.date().allow(null, ''),
    },
  }),
  requestController.create,
);

requestsRoutes.get(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(null, ''),
      request_status_id: Joi.number().required(),
      page: Joi.number().required(),
      perpage: Joi.number().required(),
    },
  }),
  requestController.index,
);

requestsRoutes.get(
  '/byuser',
  EnsureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      perpage: Joi.number().required(),
    },
  }),
  requestUserController.index,
);

requestsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  requestController.show,
);

requestsRoutes.put(
  '/:id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      attendant_description: Joi.string().required().allow(null, ''),
    },
  }),
  requestController.update,
);

export default requestsRoutes;
