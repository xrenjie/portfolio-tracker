import { Box } from '@mui/material';
import React from 'react';
import { SORT } from './constants';
import { ExpenseCard } from './ExpenseCard';

const parseExpensesByDate = (expenses) => {
  if (!expenses) return [];
  const dateMap = {};
  const dates = [];
  expenses.forEach((expense) => {
    const date = new Date(expense.date).toISOString().split('T')[0];
    const monthYear = date.split('-').slice(0, 2).join('-');
    if (!dateMap[monthYear]) {
      dateMap[monthYear] = [];
    }
    dates.push(monthYear);
    dateMap[monthYear].push(expense);
  });

  const uniqueDates = Array.from(new Set(dates));

  return uniqueDates.map((date) => ({
    date,
    children: dateMap[date],
  }));
};

export function ExpenseColumn({ expenses, sort }) {
  const getDisp = () => {
    if (sort === SORT.AMOUNT) return SORT.AMOUNT;
    return SORT.EXPENSED_DATE;
  };

  const expenseOnlyView = () =>
    expenses.map((expense) => (
      <ExpenseCard key={expense.id} expense={expense} />
    ));

  const expenseDateView = () => {
    const parsedExpenses = parseExpensesByDate(expenses);
    return parsedExpenses.map(({ date, children }) => (
      <Box key={date} sx={{}}>
        <Box
          sx={{
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '0.25rem',
            borderBottom: '1px solid rgba(0,0,0,0.2)',
            boxShadow: '0px 0px 2px rgba(0,0,0,0.2)',
            background: 'rgba(0,0,0,0.1)',
          }}
        >
          {date}
        </Box>
        {children.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </Box>
    ));
  };

  return (
    expenses && (
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        {getDisp() === SORT.AMOUNT ? expenseOnlyView() : expenseDateView()}
      </Box>
    )
  );
}
