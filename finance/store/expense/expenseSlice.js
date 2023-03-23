import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { expenseRequest, deleteExpense } from '../requests';
import { Expense } from '../../models';

export const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
    loaded: false,
  },
  reducers: {
    SET_EXPENSES: (state, action) => {
      state.expenses = Array.isArray(action.payload) ? action.payload : [];
      state.loaded = true;
    },
    CREATE_EXPENSE: () => {},
    EDIT_EXPENSE: () => {},
    DELETE_EXPENSE: (state, action) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload.id);
      deleteExpense(action.payload);
    },
    FETCH_EXPENSES: () => {},
  },
});

export const { actions } = expenseSlice;
export const expenseReducer = expenseSlice.reducer;

export const createExpense = (expense) => makeExpense(expense, 'POST');

export const editExpense = (expense) => makeExpense(expense, 'PUT');

export const makeExpense = (expense, method) => (dispatch) => {
  const newExpense = new Expense(expense);
  const now = new Date();
  const offset = now.getTimezoneOffset() + 60;
  newExpense.date = new Date(newExpense.date.getTime() + offset * 60000);
  if (newExpense.type === 'income') newExpense.amount *= -1;
  expenseRequest(newExpense, method).then(() => {
    dispatch(actions.FETCH_EXPENSES());
  });
};

export const useExpenseState = () => {
  const s = useSelector((state) => state.expense);
  return s;
};
