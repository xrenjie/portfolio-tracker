package com.xrenjie.finance.expense;

import com.xrenjie.finance.Response;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/v1/expenses")
public class ExpenseController {

  @Autowired
  private ExpenseService expenseService;

  @PostMapping(value="")
  public ResponseEntity<JSONObject> createExpense(@RequestBody Expense expense, @RequestHeader(name = "Authorization") String token) {
    try {
      Expense newExpense = expenseService.createNewExpense(expense, token);
      return new Response().success().add("expense", newExpense).build().ok();
    } catch (Exception e) {
      return new Response().add("message", e.getMessage()).build().internalServerError();
    }
  }

  @GetMapping(value="/{id}")
  public ResponseEntity<JSONObject> getExpense(@PathVariable(name="id") Long id, @RequestHeader(name = "Authorization") String token) {
    try {
      Expense expense =  expenseService.getExpense(id, token);
      return new Response().success().add("expense", expense).build().ok();
    } catch (Exception e) {
      return new Response().add("message", e.getMessage()).build().internalServerError();
    }
  }

  @GetMapping(value="")
  public ResponseEntity<JSONObject> getExpensesByOwner(@RequestHeader(name = "Authorization") String token) {
    try {
      List<Expense> expenses = expenseService.getExpenses(token);
      return new Response().success().add("expenses", expenses).build().ok();
    } catch (Exception e) {
      return new Response().add("message", e.getMessage()).build().internalServerError();
    }
  }

  @PutMapping(value="")
  public ResponseEntity<JSONObject> updateExpense(@RequestBody Expense expense, @RequestHeader(name="Authorization") String token) throws Exception {
    Expense updatedExpense = expenseService.updateExpense(expense, token);
    return new Response().success().add("expense", updatedExpense).build().ok();
  }

  @DeleteMapping(value="/{id}")
  public ResponseEntity<JSONObject> deleteOneExpense(@PathVariable(name="id") Long id, @RequestHeader(name = "Authorization") String token) throws Exception {
    Integer numDeleted = expenseService.deleteOneExpense(id, token);
    return new Response().success().add("numDeleted", numDeleted).build().ok();
  }
 //TODO: check user owns expense
 //user.getID() == expense.getOwnerID();

  @DeleteMapping(value="")
  public ResponseEntity<JSONObject> deleteMultipleExpenses(@RequestBody List<Long> ids, @RequestHeader(name = "Authorization") String token) throws Exception {
    Integer numDeleted = expenseService.deleteMultipleExpenses(ids, token);
    return new Response().success().add("numDeleted", numDeleted).ok();
  }
  //TODO: check user owns all expenses
  //delete the ones it owns
}
