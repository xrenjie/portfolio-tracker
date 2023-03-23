import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { fetchUser } from '../requests';
import { actions as userActions } from './userSlice';

function* getUser(action) {
  const res = yield call(fetchUser, action.payload);
  yield put(userActions.SET_USER(res.user));
}

function* getUserDelayed(action) {
  yield delay(200);
  yield getUser(action);
}

export function* userSaga() {
  yield takeEvery('user/FETCH_USER', getUser);
  yield takeEvery('user/UPDATE_USER', getUserDelayed);
}
