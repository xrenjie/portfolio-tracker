package com.xrenjie.finance.image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class ExpenseImage extends Image {

  @Getter
  @ManyToOne
  @JsonIgnore
  private Expense expense;

  public boolean canView(User user) {
    if (this.getOwner() == user) return true;
    Set<User> participants = this.expense.getParticipants();
    return participants.contains(user);
  }
}
