import { all, takeLatest } from 'redux-saga/effects';
import { RegisterUser } from './userRegister';

import { Types as RegisterTypes } from '../ducks/userRegister';

export default function* rootSaga() {
  yield all([takeLatest(RegisterTypes.REGISTER_REQUEST, RegisterUser)]);
}
