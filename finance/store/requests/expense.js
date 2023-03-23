import { getAccessTokenFromCookie } from '../../utils/client_utils';

export const expenseRequest = async (expense, method) => {
  let formattedBody = null;
  if (method !== 'GET') {
    formattedBody = expense ? JSON.stringify(expense) : null;
  }
  const res = await fetch('/api/expenses/expenses', {
    method: method || 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: getAccessTokenFromCookie(),
    },
    body: formattedBody,
  });
  const resJson = (await res.json())?.data || {};
  return resJson;
};

export const deleteExpense = async (expense) => {
  fetch(`/api/expenses/${expense.id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: getAccessTokenFromCookie(),
    },
    body: expense ? JSON.stringify(expense) : null,
  });
};
