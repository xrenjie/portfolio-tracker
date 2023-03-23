package com.xrenjie.finance.analytics;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.expense.ExpenseService;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
@Component
public class StatisticsService {

  @Autowired
  private UserService userService;
  @Autowired
  private ExpenseService expenseService;
  @Autowired
  private TokenValidator tokenValidator;

  public Trend getNetWorthTrend(String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    Double netWorth = user.getNetWorth();
    Instant timeNetWorthUpdated = user.getTimeNetWorthUpdated();
    if (timeNetWorthUpdated == null) timeNetWorthUpdated = new Date().toInstant();

    List<Expense> expenses = new ArrayList<Expense>(expenseService.getExpenses(token));

    Comparator<Expense> ascending = (expense1, expense2) -> {
      return Long.valueOf(expense1.getDate().getTime()).compareTo(expense2.getDate().getTime());
    };
    Comparator<Expense> descending = (expense1, expense2) -> {
      return Long.valueOf(expense2.getDate().getTime()).compareTo(expense1.getDate().getTime());
    };

    Double worth = netWorth;
    Trend trend = new Trend("date", "netWorth");

    //calculate net worth BEFORE timeNetWorthUpdated
    Collections.sort(expenses, descending);
    for (Expense expense : expenses) {
      if (expense.getDate().before(Date.from(timeNetWorthUpdated))) {
        worth += expense.getAmount();
        trend.addPair(expense.getDate(), worth);
      }
    }

//    trend.addPair(Date.from(timeNetWorthUpdated), netWorth);

    //calculate net worth AFTER timeNetWorthUpdated
    Collections.sort(expenses, ascending);
    for (Expense expense : expenses) {
      if (expense.getDate().after(Date.from(timeNetWorthUpdated))) {
        worth -= expense.getAmount();
        trend.addPair(expense.getDate(), worth);
      }
    }

    //calculate current net worth TODAY

    worth = netWorth;
    Collections.sort(expenses, ascending);
    Date today = new Date();
    Date tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));
    for (Expense expense : expenses) {
      if (
          expense.getDate().after(Date.from(timeNetWorthUpdated))
              &&
          expense.getDate().before(tomorrow)
      ) {
        worth -= expense.getAmount();
      }
    }
    trend.addPair(today, worth);

    trend.sortAscending();

    return trend;
  }
}
