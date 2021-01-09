"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EtherealMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;

    _defineProperty(this, "client", _nodemailer.default.createTransport({}));

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
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
        name: from?.name || 'Equipe BVSP',
        address: from?.email || 'equipe@bvsp.com.br'
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