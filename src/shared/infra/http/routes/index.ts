import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import requestsRouter from '@modules/requests/infra/http/routes/requests.routes';
import requestsFollowup from '@modules/requests/infra/http/routes/requestsFollowup.routes';
import requestsHistory from '@modules/requests/infra/http/routes/requestsHistory.routes';
import indicatorsRouter from '@modules/requests/infra/http/routes/indicators.routes';
import requestsBudgets from '@modules/requests/infra/http/routes/requestsBudgets.routes';
import requestsCloseOrOpenFollowup from '@modules/requests/infra/http/routes/requestsCloseOrOpenFollowup.routes';
import requestsSale from '@modules/requests/infra/http/routes/requestsSale.routes';
import requestsQuality from '@modules/requests/infra/http/routes/requestsQuality.routes';
import requestsTechnical from '@modules/requests/infra/http/routes/requestsTechnical.routes';
import requestsStatus from '@modules/requests/infra/http/routes/requestsStatus.routes';
import alertRequestRouter from '@modules/requests/infra/http/routes/alertRequest.routes';
import alertsTodayByTypeRequest from '@modules/requests/infra/http/routes/alertsTodayByTypeRequest.routes';
import alertRequestCountToday from '@modules/requests/infra/http/routes/alertRequestCountToday.routes';

const routes = Router();

// User Routes
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

// Requests Routes
routes.use('/requests', requestsRouter);
routes.use('/requests/followup', requestsFollowup);
routes.use('/requests/alert', alertRequestRouter);
routes.use('/requests/alert-count', alertRequestCountToday);
routes.use('/requests/alert-byrequest-and-type', alertsTodayByTypeRequest);

routes.use('/requests/close-followup', requestsCloseOrOpenFollowup);
routes.use('/requests/technical', requestsTechnical);
routes.use('/requests/quality', requestsQuality);
routes.use('/requests/sale', requestsSale);
routes.use('/requests/budget', requestsBudgets);

routes.use('/requests/history', requestsHistory);
routes.use('/requests/indicators', indicatorsRouter);
routes.use('/request-status', requestsStatus);

export default routes;
