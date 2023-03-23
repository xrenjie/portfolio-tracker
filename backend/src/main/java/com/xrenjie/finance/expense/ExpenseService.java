package com.xrenjie.finance.expense;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.expense.part.ExpensePartService;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {


  @Autowired
  private ExpenseRepository expenseRepository;
  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private UserService userService;
  @Autowired
  private ExpensePartService expensePartService;


  // user owns expense or has expense part related to expense
  public Expense getExpense(Long id, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    Expense expense = expenseRepository.findById(id).orElseThrow(()->new Exception());
    User user = userService.getUserByToken(token);
    if (
        expense.getOwner() != user ||
      !expense
          .getExpenseParts()
          .stream()
          .anyMatch((
              expensePart ->
                  expensePart.getPayee() == user
          ))
    ) throw new IllegalAccessException();

    return expense;
  }

  private Boolean validateOwner(Expense expense, String subject) {
    return expense.getOwnerID().equals(subject);
  }

  public Integer deleteOneExpense(Long id, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    String subject = tokenValidator.getTokenSubject(token);
    Expense expense = expenseRepository.findById(id).orElseThrow(() -> new IllegalStateException());
    if (!validateOwner(expense, subject)) throw new IllegalAccessException();
    expenseRepository.deleteById(id);
    return 1;
  }

  public Integer deleteMultipleExpenses(List<Long> ids, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    String subject = tokenValidator.getTokenSubject(token);
    List<Expense> expenses = expenseRepository.findAllById(ids);
    expenses = expenses.stream().filter((expense) -> {
      return validateOwner(expense, subject);
    }).toList();
    expenseRepository.deleteAllInBatch(expenses);
    return expenses.size();
  }

  public Expense createNewExpense(Expense expense, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User owner = userService.getUserByToken(token);
    expense.setOwner(owner);
    expense.addExpensePart();
    expenseRepository.save(expense);
    return expense;
  }

  public Expense updateExpense(Expense expense, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User owner = userService.getUserByToken(token);

    Optional<Expense> existingExpense = expenseRepository.findById(expense.getId());
    if (existingExpense.isPresent()) {
      if (existingExpense.get().getOwner() != owner) throw new IllegalAccessException();
      expense.setId(existingExpense.get().getId());
    }
    expense.setOwner(owner);
    return expenseRepository.save(expense);
  }

  public List<Expense> getExpenses(String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    List<Expense> expenses = user.getExpenses().stream().toList();

    return expenses;
  }

}
