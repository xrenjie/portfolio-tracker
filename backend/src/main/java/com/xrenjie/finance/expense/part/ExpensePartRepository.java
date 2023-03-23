package com.xrenjie.finance.expense.part;

import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensePartRepository extends JpaRepository<ExpensePart, Long> {
  List<ExpensePart> findByPayee(User payee, Pageable pageable);

  List<ExpensePart> findByExpense(Expense expense);

  List<ExpensePart> findByOwner(User owner, Pageable pageable);
}
