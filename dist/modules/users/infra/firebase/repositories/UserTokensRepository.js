"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebase = _interopRequireDefault(require("../../../../../config/firebase"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserTokensRepository {
  async save(tokenData) {
    const response = await _firebase.default.firestore().collection('tokens').add(tokenData).then().catch(error => {
      throw new _AppError.default(error);
    });
    const token = {
      id: response.id,
      ...tokenData
    };
    return token;
  }

  async findByToken(token) {
    const tokenData = await _firebase.default.firestore().collection('tokens').where('token', '==', token).get().then(snapshot => {
      const doc = snapshot.docs[0];
      return doc ? {
        id: doc.id,
        token: doc.data().token,
        user_id: doc.data().user_id,
        created_at: doc.data().created_at,
        updated_at: doc.data().updated_at
      } : undefined;
    }).catch(error => {
      throw new _AppError.default(error);
    });
    return tokenData;
  }

}

var _default = UserTokensRepository;
exports.default = _default;