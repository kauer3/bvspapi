import { Router } from 'express';

import InfomobileappController from '../controllers/InfomobileappController';

const infomobileappRouter = Router();
const infomobileappController = new InfomobileappController();

infomobileappRouter.get(
  '/',
  infomobileappController.show,
);

export default infomobileappRouter;
