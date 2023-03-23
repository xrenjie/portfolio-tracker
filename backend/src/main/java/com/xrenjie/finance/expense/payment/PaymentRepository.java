package com.xrenjie.finance.expense.payment;

import com.xrenjie.finance.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
  List<Payment> findAllByPayee(User payee);

  List<Payment> findAllByPayeeAndExpensePartId(User payee, Long expensePartId);
}
