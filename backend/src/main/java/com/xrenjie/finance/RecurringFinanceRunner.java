package com.xrenjie.finance;


import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.expense.ExpenseRepository;
import com.xrenjie.finance.expense.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@EnableScheduling
@Service
public class RecurringFinanceRunner {

  @Autowired
  private ExpenseRepository expenseRepository;

  @Scheduled(fixedDelay=24*60*60*1000)
  public void addRecurringTransactionsForToday() {
    //fetch all recurring transactions where number of recurrences left is > 0
    //for each transaction, create a new transaction with the same amount and category
    //decrement the number of recurrences left
    System.out.println("Running recurring finance");
    List<Expense> recurringExpenses = expenseRepository.findAllByIsRecurringAndTimesLeftToRecurGreaterThan(true, 0);
    for (Expense expense : recurringExpenses) {
      Expense.RecurringFrequency recurringFrequency = expense.getRecurringFrequency();
      switch (recurringFrequency) {
        case WEEKLY:
          handleWeeklyRecurringExpense(expense);
          break;
        case MONTHLY:
          handleMonthlyRecurringExpense(expense);
          break;
        case YEARLY:
          handleYearlyRecurringExpense(expense);
          break;
        case DAILY:
          handleDailyRecurringExpense(expense);
          break;
      }
    }
    System.out.println("Running recurring finance");
  }

  private void handleDailyRecurringExpense(Expense expense) {
    Date oldDate = expense.getDate();
    Date newDate = new Date(oldDate.getTime() + 24*60*60*1000);
    handleRecur(expense, newDate);
  }

  private void handleYearlyRecurringExpense(Expense expense) {
    Date oldDate = expense.getDate();
    Date newDate = new Date(oldDate.getTime() + 365*24*60*60*1000);
    handleRecur(expense, newDate);
  }

  private void handleMonthlyRecurringExpense(Expense expense) {
    Date oldDate = expense.getDate();
    Date newDate = new Date(oldDate.getTime() + 30*24*60*60*1000);
    handleRecur(expense, newDate);
  }

  private void handleWeeklyRecurringExpense(Expense expense) {
    Date oldDate = expense.getDate();
    Date newDate = new Date(oldDate.getTime() + 7*24*60*60*1000);
    handleRecur(expense, newDate);
  }

  private void handleRecur(Expense expense, Date newDate) {
    Expense newExpense = new Expense(expense);
    newExpense.makeRecurrence(newDate);
    expense.decrementRecurringTimesLeft();
    expenseRepository.save(expense);
    expenseRepository.save(newExpense);
  }
}
