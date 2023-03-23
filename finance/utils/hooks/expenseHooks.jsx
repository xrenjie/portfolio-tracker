import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ExpenseStore } from '../../store';

export function useReloadExpenses(user) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;
    dispatch(ExpenseStore.actions.FETCH_EXPENSES());
  }, [user]);
}
