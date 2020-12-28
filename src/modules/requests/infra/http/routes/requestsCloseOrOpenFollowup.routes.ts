import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RequestsCloseOrOpenFollowupController from '../controllers/RequestsCloseOrOpenFollowupController';

const requestsCloseOrOpenFollowup = Router();
const requestsCloseOrOpenFollowupController = new RequestsCloseOrOpenFollowupController();

requestsCloseOrOpenFollowup.post(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      request_id: Joi.string().uuid().required(),
      request_type_id: Joi.number().required(),
      action: Joi.string().required(),
    },
  }),
  requestsCloseOrOpenFollowupController.create,
);

export default requestsCloseOrOpenFollowup;
