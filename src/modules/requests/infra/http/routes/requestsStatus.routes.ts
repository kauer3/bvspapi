import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StatusRequestsController from '../controllers/StatusRequestsController';

const requestsStatus = Router();
const statusRequestsController = new StatusRequestsController();

requestsStatus.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  statusRequestsController.show,
);

export default requestsStatus;
