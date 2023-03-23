import { Button, IconButton } from '@mui/material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { createExpense } from './expenseSlice';

export function showDeletedNotification(expense) {
  const action = (snackbarId) => {
    const dispatch = useDispatch();
    return (
      <>
        <Button
          label="Undo"
          variant="contained"
          onClick={() => {
            dispatch(createExpense(expense));
            closeSnackbar(snackbarId);
          }}
        >
          Undo
        </Button>
        <IconButton onClick={() => closeSnackbar(snackbarId)}>
          <IoClose />
        </IconButton>
      </>
    );
  };

  enqueueSnackbar('Expense deleted', { action });
}
