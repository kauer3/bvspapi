"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebase = _interopRequireDefault(require("../../../../../config/firebase"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  async findById(id) {
    const user = await _firebase.default.firestore().collection('users').doc(id).get().then(snapshot => {
      const {
        name,
        name_insensitive,
        city,
        country,
        company,
        email,
        accesscode
      } = snapshot.data();
      return {
        id,
        name,
        name_insensitive,
        city,
        country,
        company,
        email,
        accesscode
      };
    }).catch(error => {
      throw new _AppError.default(error);
    });
    return user;
  }

  async findByEmail(email) {
    const user = await _firebase.default.firestore().collection('users').where('email', '==', email.toLowerCase().trim()).get().then(snapshot => {
      const doc = snapshot.docs[0];
      return doc ? {
        id: doc.id,
        name: doc.data().name,
        name_insensitive: doc.data().name_insensitive,
        city: doc.data().city,
        country: doc.data().country,
        company: doc.data().company,
        email: doc.data().email,
        accesscode: doc.data().accesscode
      } : undefined;
    }).catch(error => {
      throw new _AppError.default(error);
    });
    return user;
  }

  async create(userData) {
    const response = await _firebase.default.firestore().collection('users').add(userData).then().catch(error => {
      throw new _AppError.default(error);
    });
    const data = {
      id: response.id,
      ...userData
    };
    return data;
  }

  async save(userData) {
    await _firebase.default.firestore().collection('users').doc(userData.id).update(userData);
    return userData;
  }

}

var _default = UsersRepository;
exports.default = _default;