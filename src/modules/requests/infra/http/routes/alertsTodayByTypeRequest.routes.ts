import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AlertByRequestAndRequestTypeController from '../controllers/AlertByRequestAndRequestTypeController';

const alertsTodayByTypeRequestRouter = Router();
const alertByRequestAndRequestTypeController = new AlertByRequestAndRequestTypeController();

alertsTodayByTypeRequestRouter.get(
  '/:request_type_id/:date/:page/:perpage',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_type_id: Joi.number().required(),
      date: Joi.date().required(),
      page: Joi.number().required(),
      perpage: Joi.number().required(),
    },
  }),
  alertByRequestAndRequestTypeController.index,
);

export default alertsTodayByTypeRequestRouter;
