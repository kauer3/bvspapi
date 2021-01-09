"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _requests = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requests.routes"));

var _requestsFollowup = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsFollowup.routes"));

var _requestsHistory = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsHistory.routes"));

var _indicators = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/indicators.routes"));

var _requestsBudgets = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsBudgets.routes"));

var _requestsCloseOrOpenFollowup = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsCloseOrOpenFollowup.routes"));

var _requestsSale = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsSale.routes"));

var _requestsQuality = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsQuality.routes"));

var _requestsTechnical = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsTechnical.routes"));

var _requestsStatus = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/requestsStatus.routes"));

var _alertRequest = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/alertRequest.routes"));

var _alertsTodayByTypeRequest = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/alertsTodayByTypeRequest.routes"));

var _alertRequestCountToday = _interopRequireDefault(require("../../../../modules/requests/infra/http/routes/alertRequestCountToday.routes"));

var _infomobileapp = _interopRequireDefault(require("../../../../modules/infomobileapp/infra/http/routes/infomobileapp.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)(); // User Routes

routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default); // Requests Routes

routes.use('/requests', _requests.default);
routes.use('/requests/followup', _requestsFollowup.default);
routes.use('/requests/alert', _alertRequest.default);
routes.use('/requests/alert-count', _alertRequestCountToday.default);
routes.use('/requests/alert-byrequest-and-type', _alertsTodayByTypeRequest.default);
routes.use('/requests/close-followup', _requestsCloseOrOpenFollowup.default);
routes.use('/requests/technical', _requestsTechnical.default);
routes.use('/requests/quality', _requestsQuality.default);
routes.use('/requests/sale', _requestsSale.default);
routes.use('/requests/budget', _requestsBudgets.default);
routes.use('/requests/history', _requestsHistory.default);
routes.use('/requests/indicators', _indicators.default);
routes.use('/request-status', _requestsStatus.default);
routes.use('/info-mobile-app', _infomobileapp.default);
var _default = routes;
exports.default = _default;