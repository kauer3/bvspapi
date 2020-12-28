import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BudgetRequestsController from '../controllers/BudgetRequestsController';

const requestsBudgets = Router();
const budgetRequestsController = new BudgetRequestsController();

requestsBudgets.get(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
  }),
  budgetRequestsController.show,
);

requestsBudgets.put(
  '/:request_id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      request_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required().allow(null, ''),
      budget_number: Joi.string().required().allow(null, ''),
    },
  }),
  budgetRequestsController.update,
);

export default requestsBudgets;
