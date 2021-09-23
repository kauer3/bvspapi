"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeMailjet = _interopRequireDefault(require("node-mailjet"));

var _AppError = _interopRequireDefault(require("../../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Mailjet {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.mailTemplateProvider = mailTemplateProvider;
  }

  async sendMail({
    subject,
    templateData,
    to,
    from
  }) {
    const client = _nodeMailjet.default.connect('7f3614424114c600a0893a1918fc8e28', '9121d790bdf201d3b52a31d4609f1821');

    try {
      await client.post('send', {
        version: 'v3.1'
      }).request({
        Messages: [{
          From: {
            Email: 'bvspapp@gmail.com',
            Name: 'BVSP'
          },
          To: [{
            Email: to.email,
            Name: to.name
          }],
          Subject: subject,
          HTMLPart: await this.mailTemplateProvider.parse(templateData),
          CustomID: 'AppGettingStartedTest'
        }]
      });
    } catch {
      throw new _AppError.default('it was not possible send e-mail. Try later', 500);
    }
  }

}

exports.default = Mailjet;