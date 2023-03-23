package com.xrenjie.finance.expense.payment;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.expense.part.ExpensePart;
import com.xrenjie.finance.expense.part.ExpensePartService;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserRepository;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Component
public class PaymentService {

  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private PaymentRepository paymentRepository;
  @Autowired
  private UserService userService;

  
  public Payment createPayment(Payment payment, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    
    User payee = userService.getUserByToken(token);
    payment.setPayee(payee);
    return paymentRepository.save(payment);
  }

  public List<Payment> getPaymentsByToken(String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User payee = userService.getUserByToken(token);
    return paymentRepository.findAllByPayee(payee);
  }

  public List<Payment> getPaymentsByExpensePart(Long expensePartId, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User payee = userService.getUserByToken(token);
    return paymentRepository.findAllByPayeeAndExpensePartId(payee, expensePartId);
  }

  public Payment getPaymentById(Long id, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User requester = userService.getUserByToken(token);
    Payment payment = paymentRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException());
    if (payment.getPayee() == requester) {
      return payment;
    } else {
      throw new IllegalAccessException();
    }
  }

  public void deletePayment(Long paymentId, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User requester = userService.getUserByToken(token);
    Payment payment = paymentRepository.findById(paymentId)
        .orElseThrow(() -> new IllegalStateException());
    if (payment.getPayee() != requester) throw new IllegalAccessException();
    paymentRepository.delete(payment);
  }

  public void updatePayment(Payment payment, String token) throws Exception{
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User requester = userService.getUserByToken(token);
    if (payment.getPayee() != requester) throw new IllegalAccessException();
    paymentRepository.save(payment);
  }
}
