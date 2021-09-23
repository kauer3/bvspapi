"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('firebase/auth');

require('firebase/firestore');

require('firebase/storage');

const config = {
  apiKey: 'AIzaSyDgs55RdRUphcenbrJN4SaeGvSrFDh6jbw',
  authDomain: 'bvspapp-ab6d1.firebaseapp.com',
  databaseURL: 'https://bvspapp-ab6d1.firebaseio.com',
  projectId: 'bvspapp-ab6d1',
  storageBucket: 'bvspapp-ab6d1.appspot.com',
  messagingSenderId: '71141359891',
  appId: '1:71141359891:web:a5b092368a65cce2c3dae6',
  measurementId: 'G-6QG1R39J6R'
};

var _default = _app.default.initializeApp(config);

exports.default = _default;