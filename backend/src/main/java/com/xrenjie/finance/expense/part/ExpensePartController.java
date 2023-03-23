package com.xrenjie.finance.expense.part;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/v1/parts")
public class ExpensePartController {

  @Autowired
  private ExpensePartService expensePartService;

  @GetMapping(value="/{id}")
  public ExpensePart getExpensePartById(@PathVariable(name="id") Long id, @RequestHeader(name = "Authorization") String token) throws Exception {
    return expensePartService.getPartById(id, token);
  }

  //only logged in user with valid token can get list of their own expenses
  @GetMapping(value="/payee")
  public List<ExpensePart> getExpensePartsByPayee(@RequestParam(name="page") int page, @RequestParam(name="size") int size, @RequestHeader(name = "Authorization") String token) throws Exception {
    return expensePartService.getPartsByPayee(page, size, token);
  }

  @GetMapping(value="/expense/{id}")
  public List<ExpensePart> getExpensePartsByExpense(@PathVariable(name="id") Long id, @RequestHeader(name = "Authorization") String token) throws Exception {
    return expensePartService.getPartsByExpense(id, token);
  }

  @GetMapping(value="/me")
  public List<ExpensePart> getExpensePartsByOwner(@RequestParam(name="page") int page, @RequestParam(name="size") int size, @RequestHeader(name = "Authorization") String token) throws Exception {
    return expensePartService.getPartsByOwner(page, size, token);
  }

  @PutMapping(value="")
  public ExpensePart updateExpensePart(@RequestBody ExpensePart expensePart, @RequestHeader(name = "Authorization") String token) throws Exception {
    return expensePartService.updatePart(expensePart, token);
  }
}
