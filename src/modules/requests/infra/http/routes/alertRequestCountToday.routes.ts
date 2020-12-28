import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AlertCountTodayController from '../controllers/AlertCountTodayController';

const alertRequestCountToday = Router();
const alertCountTodayController = new AlertCountTodayController();

alertRequestCountToday.get(
  '/:profile_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      profile_id: Joi.number().required(),
    },
  }),
  alertCountTodayController.show,
);

export default alertRequestCountToday;
