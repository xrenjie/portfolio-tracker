package com.xrenjie.finance.expense.part;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.expense.ExpenseRepository;
import com.xrenjie.finance.expense.ExpenseService;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpensePartService {

  @Autowired
  private ExpensePartRepository expensePartRepository;
  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private UserService userService;
  @Autowired
  private ExpenseRepository expenseRepository;

  public List<ExpensePart> addParts(List<ExpensePart> parts, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    expensePartRepository.saveAll(parts);

    return parts;
  }

  public ExpensePart getPartById(Long id, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    return expensePartRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException());
  }

  public List<ExpensePart> getPartsByPayee(int page, int size, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User payee = userService.getUserByToken(token);
    Pageable pageable = PageRequest.of(page, size);
    return expensePartRepository.findByPayee(payee, pageable);
  }

  public List<ExpensePart> getPartsByExpense(Long expenseId, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    Expense expense = expenseRepository.findById(expenseId).orElseThrow(()->new Exception());
    if (expense.getOwner() != userService.getUserByToken(token)) throw new IllegalAccessException();
    return expensePartRepository.findByExpense(expense);
  }

  public ExpensePart updatePart(ExpensePart part, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    return expensePartRepository.save(part);
  }

  public List<ExpensePart> getPartsByOwner(int page, int size, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User owner = userService.getUserByToken(token);
    Pageable pageable = PageRequest.of(page, size);
    return expensePartRepository.findByOwner(owner, pageable);
  }

  public void addExpensePart(Expense expense) {
    ExpensePart expensePart = new ExpensePart();
    expensePart.setExpense(expense);
    expensePart.setOwner(expense.getOwner());
    expensePart.setPayee(expense.getOwner());
    expensePart.setAmount(expense.getAmount());
    expensePart.setName(expense.getName());
    expensePart.setDescription(expense.getDescription());
    expensePartRepository.save(expensePart);
  }
}
