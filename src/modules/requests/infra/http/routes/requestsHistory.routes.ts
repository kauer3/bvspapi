import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import HistoryRequestController from '../controllers/HistoryRequestController';

const requestsHistory = Router();
const historyRequestController = new HistoryRequestController();

requestsHistory.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().required(),
    },
  }),
  historyRequestController.index,
);

export default requestsHistory;
