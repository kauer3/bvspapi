import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RequestsFollowupController from '../controllers/RequestsFollowupController';
import RequestsGetFollowupController from '../controllers/RequestsGetFollowupController';

const requestsFollowup = Router();
const requestsFollowupController = new RequestsFollowupController();
const requestsGetFollowupController = new RequestsGetFollowupController();

requestsFollowup.post(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      request_type: Joi.number().allow(null, 0),
      request_id: Joi.string().uuid().required(),
      attendant_description: Joi.string().allow(null, ''),
      alert: Joi.string().allow(null, null),
    },
  }),
  requestsFollowupController.create,
);

requestsFollowup.get(
  '/:request_id/:request_type_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().required(),
      request_type_id: Joi.number().required(),
    },
  }),
  requestsFollowupController.show,
);

requestsFollowup.get(
  '/by/request-id/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().required(),
    },
  }),
  requestsGetFollowupController.index,
);

requestsFollowup.get(
  '/search-all',
  EnsureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      request_type_id: Joi.number().required(),
      request_status_id: Joi.number().required(),
      name: Joi.string().allow(null, ''),
      page: Joi.number().required(),
      perpage: Joi.number().required(),
    },
  }),
  requestsFollowupController.index,
);

export default requestsFollowup;
