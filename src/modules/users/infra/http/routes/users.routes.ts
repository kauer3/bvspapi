import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersFirebaseExportToPostgresController from '../controllers/UsersFirebaseExportToPostgresController';

import UsersController from '../controllers/UsersController';
import UsersSearchByEmailController from '../controllers/UsersSearchByEmailController';
import UsersSearchByNameController from '../controllers/UsersSearchByNameController';
import EnsureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const usersController = new UsersController();
const usersSearchByEmailController = new UsersSearchByEmailController();
const usersSearchByNameController = new UsersSearchByNameController();

const usersFirebaseExportToPostgresController = new UsersFirebaseExportToPostgresController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      profile_id: Joi.number().required(),
      name: Joi.string().required(),
      company: Joi.string().required(),
      city: Joi.string().required(),
      city_state: Joi.string().required(),
      country: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      telephone: Joi.string().allow(null, ''),
    },
  }),
  usersController.create,
);

usersRoutes.get(
  '/byemail',
  EnsureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string(),
    },
  }),
  usersSearchByEmailController.index,
);

usersRoutes.get(
  '/byname',
  EnsureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(null, ''),
      page: Joi.number().required(),
      perpage: Joi.number().required(),
      profile_id: Joi.number().required(),
    },
  }),
  usersSearchByNameController.index,
);

usersRoutes.get('/:id', EnsureAuthenticated, usersController.show);

usersRoutes.put(
  '/:id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      profile_id: Joi.number().required(),
      name: Joi.string().required(),
      company: Joi.string().required(),
      city: Joi.string().required(),
      city_state: Joi.string().required(),
      country: Joi.string().required(),
      telephone: Joi.string().allow(null, ''),
      password: Joi.string().allow(null, ''),
    },
  }),
  EnsureAuthenticated,
  usersController.update,
);

usersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  EnsureAuthenticated,
  usersController.remove,
);

usersRoutes.get(
  '/export/googlefirestore/postgres',
  usersFirebaseExportToPostgresController.create,
);

export default usersRoutes;
