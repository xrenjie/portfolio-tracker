import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseStore } from '../../../store';
import { ModalToolkit, SortableColumnView } from '../../general/components';
import { DASHBOARDS, DASHBOARD_TITLES, SORT } from './constants';
import { ExpenseColumn } from './ExpenseColumn';
import { EditExpense } from '../../edit/EditExpense';

export function ExpenseDashboardContent({ dashboardType }) {
  const expenseState = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const title = DASHBOARD_TITLES[dashboardType];

  const expenses = useMemo(() => {
    if (dashboardType === DASHBOARDS.ALL) {
      return expenseState.expenses;
    }
    if (dashboardType === DASHBOARDS.EXPENSES) {
      return expenseState.expenses.filter((expense) => expense.amount > 0);
    }
    return expenseState.expenses.filter((expense) => expense.amount < 0);
  }, [expenseState, dashboardType]);

  const { openModal } = ModalToolkit.useModalContext();

  const onAddExpense = async () => {
    const newExpense = await openModal(
      <EditExpense
        expense={{
          name: '',
          description: '',
          amount: 0.0,
          date: new Date(),
        }}
        title="Create New Transaction"
      />,
      {
        height: '80vh',
        width: '600px',
      }
    );

    if (newExpense) {
      dispatch(ExpenseStore.createExpense(newExpense));
    }
  };

  const buttonConfig = [
    {
      id: 'create',
      title: 'Add Transaction',
      icon: 'add',
      onClick: onAddExpense,
      variant: 'contained',
    },
  ];

  const renderFn = ({ rows, sort }) => (
    <ExpenseColumn expenses={rows} sort={sort} />
  );

  return (
    <SortableColumnView
      sortConfig={sortConfig}
      buttonConfig={buttonConfig}
      rows={expenses || []}
      renderFn={renderFn}
      title={title}
      sortable
    />
  );
}

const sortConfig = [
  {
    id: SORT.EXPENSED_DATE,
    title: 'Date',
    sortFn: (a, b) => new Date(b.date) - new Date(a.date),
  },
  {
    id: SORT.AMOUNT,
    title: 'Amount',
    sortFn: (a, b) => parseInt(b.amount, 10) - parseInt(a.amount, 10),
  },
  {
    id: SORT.CREATED,
    title: 'Created',
    sortFn: (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
  },
  {
    id: SORT.MODIFIED,
    title: 'Modified',
    sortFn: (a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate),
  },
];
