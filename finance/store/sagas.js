import { all } from 'redux-saga/effects';
import { expenseSaga } from './expense';
import { userSaga } from './user';

export default function* rootSaga() {
  yield all([userSaga(), expenseSaga()]);
}
