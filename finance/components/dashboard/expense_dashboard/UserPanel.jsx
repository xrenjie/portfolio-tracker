import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'mathjs';
import { FinanceUser } from '../../../models';
import { ExpenseStore, UserStore } from '../../../store';
import { ModalToolkit } from '../../general/components';
import { EditUser } from '../../edit/EditUser';

export function UserPanel() {
  const userState = UserStore.useUserState();
  const expenseState = ExpenseStore.useExpenseState();
  const { user } = useUser();
  const { openModal } = ModalToolkit.useModalContext();
  const dispatch = useDispatch();

  const handleEditUser = async () => {
    const userdetails = userState.userDetails;
    const financeUser = new FinanceUser(userdetails, user.sub);

    const res = await openModal(
      <EditUser user={financeUser} title="Edit User" />,
      { width: '450px', height: '400px' }
    );

    if (res) {
      dispatch(UserStore.updateUserDetails(res));
    }
  };

  const futureNetWorth = getFutureNetWorth(userState, expenseState);
  const currentNetWorth = getCurrentNetWorth(userState, expenseState);

  return (
    <div>
      <img src={user.picture} alt={user.name} />

      <h1>{user.name}</h1>

      <p>{userState.userDetails?.email}</p>
      <p
        className={futureNetWorth < 0 ? 'tw-text-red-600 tw-font-semibold' : ''}
      >
        {'Total (Future) Net Worth: '}$
        {format(futureNetWorth, { notation: 'fixed', precision: 2 })}
      </p>
      <p
        className={
          currentNetWorth < 0 ? 'tw-text-red-600 tw-font-semibold' : ''
        }
      >
        <strong>
          {'Current Net Worth: '}$
          {format(currentNetWorth, { notation: 'fixed', precision: 2 })}
        </strong>
      </p>
      <Button variant="outlined" onClick={handleEditUser}>
        Edit
      </Button>
    </div>
  );
}

const normalizeDate = (date = new Date()) => new Date(date.toDateString());

const getCurrentNetWorth = (userState, expenseState) => {
  let netWorth = 0;
  let timeNetWorthUpdated;
  const today = normalizeDate();
  if (userState.userDetails) {
    netWorth = userState.userDetails.netWorth;
    if (userState.userDetails.timeNetWorthUpdated) {
      timeNetWorthUpdated = normalizeDate(
        new Date(userState.userDetails.timeNetWorthUpdated)
      );
    } else {
      timeNetWorthUpdated = normalizeDate();
    }
  }
  if (expenseState.expenses) {
    expenseState.expenses.forEach((expense) => {
      const expenseDate = normalizeDate(new Date(expense.date));
      if (expenseDate >= timeNetWorthUpdated && expenseDate <= today) {
        netWorth -= expense.amount;
      }
    });
  }
  return netWorth;
};

const getFutureNetWorth = (userState, expenseState) => {
  let netWorth = 0;
  let timeNetWorthUpdated;
  if (userState.userDetails) {
    netWorth = userState.userDetails.netWorth;
    if (userState.userDetails.timeNetWorthUpdated)
      timeNetWorthUpdated = normalizeDate(
        new Date(userState.userDetails.timeNetWorthUpdated)
      );
    else timeNetWorthUpdated = normalizeDate(new Date());
  }
  if (expenseState.expenses) {
    expenseState.expenses.forEach((expense) => {
      const expenseDate = normalizeDate(new Date(expense.date));
      if (expenseDate >= timeNetWorthUpdated) {
        netWorth -= expense.amount;
      }
    });
  }
  return netWorth;
};
