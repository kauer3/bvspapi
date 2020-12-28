import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TechnicalRequestsController from '../controllers/TechnicalRequestsController';

const requestsTechnical = Router();
const technicalRequestsController = new TechnicalRequestsController();

requestsTechnical.post(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  technicalRequestsController.create,
);

requestsTechnical.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  technicalRequestsController.show,
);

requestsTechnical.put(
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
  technicalRequestsController.save,
);

export default requestsTechnical;
