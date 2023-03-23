import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { userReducer } from './user';
import { expenseReducer } from './expense';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
  },
  middleware: (getDefaultMiddlewarer) =>
    getDefaultMiddlewarer().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
