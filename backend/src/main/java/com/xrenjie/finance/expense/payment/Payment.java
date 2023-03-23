package com.xrenjie.finance.expense.payment;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xrenjie.finance.expense.part.ExpensePart;
import com.xrenjie.finance.generic.DefaultNameDescription;
import com.xrenjie.finance.image.Image;
import com.xrenjie.finance.image.PaymentImage;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.usergroup.UserGroup;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@ToString(exclude = {"images", "expensePart"})
@Table(name = "payment")
@NoArgsConstructor
public class Payment extends DefaultNameDescription {
  @Getter
  @Setter
  @GeneratedValue
  @Id
  private Long id;
  @ManyToOne
  @Getter
  @Setter
  @JsonBackReference
  private User payee;
  @Setter
  @Getter
  private Double amount;
  @Getter
  @Setter
  @OneToMany(mappedBy = "id")
  @JsonIgnore
  private Set<PaymentImage> images = new HashSet<PaymentImage>();
  @Getter
  @Setter
  @ManyToOne
  @JsonIgnore
  private ExpensePart expensePart;

  public Payment(String name, String description) {
    super(name, description);
  }

  public Payment(String name, String description, Double amount, User payee, ExpensePart expensePart) {
    super(name, description);
    this.amount = amount;
    this.payee = payee;
    this.expensePart = expensePart;
  }

  @JsonIgnore
  public Set<User> getParticipants() {
    return this.expensePart.getExpense().getParticipants();
  }

  public boolean canView(User user) {
    return this.getParticipants().contains(user);
  }
}
