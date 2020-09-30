"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EtherealMailProvider {
  client = _nodemailer.default.createTransport({});

  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        service: 'gmail',
        auth: {
          user: 'bvspapp@gmail.com',
          pass: 'bvspapp2020'
        }
      });

      this.client = transporter;
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const message = await this.client.sendMail({
      from: {
        name: (from === null || from === void 0 ? void 0 : from.name) || 'Equipe BVSP',
        address: (from === null || from === void 0 ? void 0 : from.email) || 'equipe@bvsp.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    }); // eslint-disable-next-line

    console.log('Message sent: %s', message.messageId); // eslint-disable-next-line

    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(message));
  }

}

exports.default = EtherealMailProvider;