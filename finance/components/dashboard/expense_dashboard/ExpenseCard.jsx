import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Expense } from '../../../models';
import { ExpenseStore } from '../../../store';
import { ModalToolkit } from '../../general/components';
import { EditExpense } from '../../edit/EditExpense';

export function ExpenseCard({ expense }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const amountDisplay = () => {
    if (expense.amount > 0) {
      return (
        <strong className="tw-pr-2 tw-text-red-500">{expense.amount}</strong>
      );
    }
    return (
      <strong className="tw-pr-2 tw-text-green-700">
        +{Math.abs(expense.amount)}
      </strong>
    );
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        flex: 1,
        flexDirection: 'column',
        padding: '0.25rem',
      }}
      className={expense.amount > 0 ? 'tw-bg-white' : 'tw-bg-green-100'}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          {amountDisplay()}
          {expense.name}
        </Box>
        <IconButton onClick={handleOpenMenu}>
          <IoEllipsisHorizontalOutline />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box className="tw-text-xs">{expense.description}</Box>

        <Box
          sx={{
            fontSize: '0.75rem',
          }}
        >
          {expense.date
            ? new Date(expense.date).toDateString()
            : new Date(expense.createdDate).toDateString()}
        </Box>
      </Box>
      <ExpenseMenu
        open={open}
        expense={expense}
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
      />
    </Box>
  );
}

function ExpenseMenu({ open, expense, anchorEl, handleCloseMenu }) {
  const dispatch = useDispatch();
  const { openModal, openConfirmModal } = ModalToolkit.useModalContext();

  const editExpense = async () => {
    const exp = new Expense(expense);
    handleCloseMenu();
    const newExpense = await openModal(
      <EditExpense expense={exp} title={`Edit ${exp.name}`} />,
      {
        height: 'auto',
        width: '600px',
      }
    );
    if (newExpense) {
      dispatch(ExpenseStore.editExpense(newExpense));
    }
  };

  const deleteExpense = () => {
    openConfirmModal({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this expense?',
    }).then(() => {
      dispatch(ExpenseStore.actions.DELETE_EXPENSE(expense));
    });
    handleCloseMenu();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleCloseMenu}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={editExpense}>Edit</MenuItem>
      <MenuItem onClick={deleteExpense}>Delete</MenuItem>
    </Menu>
  );
}
