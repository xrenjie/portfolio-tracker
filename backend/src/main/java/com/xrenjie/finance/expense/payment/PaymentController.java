package com.xrenjie.finance.expense.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/v1/payments")
public class PaymentController {

  @Autowired
  private PaymentService paymentService;

  @GetMapping(value="/{id}")
  public void getPaymentById(@PathVariable(name="id") Long id, @RequestHeader String token) throws Exception {
    paymentService.getPaymentById(id, token);
  }

  @GetMapping(value="/part/{id}")
  public void getPaymentsByExpensePart(@PathVariable(name="id") Long expensePartId, @RequestHeader String token) throws Exception {
    paymentService.getPaymentsByExpensePart(expensePartId, token);
  }

  @GetMapping(value="/user")
  public void getPaymentsByOwner(@RequestHeader String token) throws Exception {
    paymentService.getPaymentsByToken(token);
  }

  @PostMapping
  public void createPayment(@RequestBody Payment payment, @RequestHeader String token) throws Exception {
    paymentService.createPayment(payment, token);
  }

  @DeleteMapping(value="/{id}")
  public void deletePayment(@PathVariable(name="id") Long id, @RequestHeader String token) throws Exception {
    paymentService.deletePayment(id, token);
  }

  @PutMapping
  public void updatePayment(@RequestBody Payment payment, @RequestHeader String token) throws Exception {
    paymentService.updatePayment(payment, token);
  }
}
