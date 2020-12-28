import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AlertController from '../controllers/AlertController';

const alertRequest = Router();
const alertController = new AlertController();

alertRequest.post(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      request_id: Joi.string().uuid().required(),
      moment: Joi.date().required(),
    },
  }),
  alertController.create,
);

alertRequest.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  alertController.show,
);

export default alertRequest;
