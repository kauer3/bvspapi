"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class InfomobileappController {
  async show(request, response) {
    return response.json({
      moible_version: {
        manifest: '1.4.6',
        ios: '1.4.6',
        android: '17'
      }
    });
  }

}

exports.default = InfomobileappController;