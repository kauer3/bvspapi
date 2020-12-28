import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import IndicatorsByYearController from '../controllers/IndicatorsByYearController';
import IndicatorsByMonthController from '../controllers/IndicatorsByMonthController';

const indicatorsRoutes = Router();
const indicatorsByYearController = new IndicatorsByYearController();
const indicatorsByMonthController = new IndicatorsByMonthController();

indicatorsRoutes.get(
  '/by-year',
  celebrate({
    [Segments.QUERY]: {
      year: Joi.number().required(),
    },
  }),
  indicatorsByYearController.index,
);

indicatorsRoutes.get(
  '/by-month',
  celebrate({
    [Segments.QUERY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  indicatorsByMonthController.index,
);

export default indicatorsRoutes;
