import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import QualityRequestsController from '../controllers/QualityRequestsController';

const requestsQuality = Router();
const qualityRequestsController = new QualityRequestsController();

requestsQuality.put(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required().allow(null, ''),
      rnc: Joi.string().allow(null, ''),
      proceed: Joi.number().allow(null, 0),
    },
  }),
  qualityRequestsController.update,
);

requestsQuality.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  qualityRequestsController.show,
);

export default requestsQuality;
