package com.xrenjie.finance.expense;

import com.xrenjie.finance.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findAllByOwner(User user);
  List<Expense> findAllByIsRecurringAndTimesLeftToRecurGreaterThan(boolean recurring, int timesLeftToRecur);

}
