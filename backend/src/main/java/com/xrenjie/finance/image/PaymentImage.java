package com.xrenjie.finance.image;

import com.xrenjie.finance.expense.payment.Payment;
import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
public class PaymentImage extends Image {

  @Getter
  @ManyToOne
  private Payment payment;

  public boolean canView(User user) {
    if (this.getOwner() == user) return true;
    Set<User> participants = this.payment.getParticipants();
    return participants.contains(user);
  }

}
