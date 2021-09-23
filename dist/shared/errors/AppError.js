"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AppError {
  constructor(message, statusCode = 400) {
    _defineProperty(this, "message", void 0);

    _defineProperty(this, "statusCode", void 0);

    this.message = message;
    this.statusCode = statusCode;
  }

}

var _default = AppError;
exports.default = _default;