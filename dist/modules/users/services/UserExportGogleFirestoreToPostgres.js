"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebase = _interopRequireDefault(require("../../../config/firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserExportGogleFirestoreToPostgres {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute() {
    const snapshot = await _firebase.default.firestore().collection('users').get(); // eslint-disable-next-line

    for await (const doc of snapshot.docs) {
      const passwordHashed = await this.hashProvider.generateHash(String(doc.data().accesscode));
      const data = {
        profile_id: 6,
        name: String(doc.data().name),
        city: doc.data().city ? String(doc.data().city) : '',
        city_state: doc.data().city_state ? String(doc.data().city_state) : '',
        country: doc.data().country ? String(doc.data().country) : '',
        company: String(doc.data().company),
        email: String(doc.data().email),
        telephone: doc.data().telephone ? String(doc.data().telephone) : '',
        password: passwordHashed
      };
      await this.usersRepository.create(data);
    }

    return 'Exportação concluída';
  }

}

var _default = UserExportGogleFirestoreToPostgres;
exports.default = _default;