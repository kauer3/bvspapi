import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import RecoveryMobileCodeController from '../controllers/RecoveryMobileCodeController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const recoveryMobileCodeController = new RecoveryMobileCodeController();

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

passwordRouter.post(
  '/recovery/mobile-code',
  celebrate({
    [Segments.BODY]: {
      mobile_code: Joi.number().required(),
    },
  }),
  recoveryMobileCodeController.show,
);

export default passwordRouter;
