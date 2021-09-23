"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _InfomobileappController = _interopRequireDefault(require("../controllers/InfomobileappController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const infomobileappRouter = (0, _express.Router)();
const infomobileappController = new _InfomobileappController.default();
infomobileappRouter.get('/', infomobileappController.show);
var _default = infomobileappRouter;
exports.default = _default;