import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { expenseRequest } from '../requests';
import { actions as expenseActions } from './expenseSlice';
import { showDeletedNotification } from './notification';

function* getExpenses(action) {
  const res = yield call(expenseRequest, action.payload, 'GET');
  yield put(expenseActions.SET_EXPENSES(res.expenses));
}

function* expenseDeletedSaga(action) {
  yield delay(500);
  yield call(showDeletedNotification, action.payload);
  yield getExpenses(action);
}

export function* expenseSaga() {
  yield takeEvery('expense/FETCH_EXPENSES', getExpenses);
  yield takeEvery('expense/DELETE_EXPENSE', expenseDeletedSaga);
}
