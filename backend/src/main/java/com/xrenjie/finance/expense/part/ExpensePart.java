package com.xrenjie.finance.expense.part;

import com.fasterxml.jackson.annotation.*;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.expense.payment.Payment;
import com.xrenjie.finance.generic.DefaultNameDescription;
import com.xrenjie.finance.image.ExpenseImage;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.usergroup.UserGroup;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@ToString(exclude = {"images", "payment", "expense", "payee", "owner", "participants"})
@Table(name="expense_part")
@NoArgsConstructor
@JsonIgnoreProperties({"owner","images","payee","payment","expense", "participants"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ExpensePart extends DefaultNameDescription {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id")
  @Getter @NonNull
  private Long id;
  @Setter
  @Getter
  @ManyToOne @NonNull
  @JsonBackReference
  private User owner;
  @Getter
  @Setter @NonNull
  private Double amount;
  @Setter
  @Getter
  @JsonIgnore
  @OneToMany(mappedBy = "id") // mappedBy indicates that this side is the
  private Set<ExpenseImage> images = new HashSet<ExpenseImage>();
  @Getter
  @Setter
  @Column(name = "fully_paid", nullable = false, columnDefinition = "boolean default false")
  private Boolean fullyPaid = false;
  @Getter
  @Setter
  @ManyToOne
  @JsonIgnore
  private User payee;
  @Getter
  @Setter
  @OneToMany(mappedBy="id")
  @JsonIgnore
  private Set<Payment> payment = new HashSet<Payment>();
  @Getter
  @Setter @NonNull
  @ManyToOne
  @JoinColumn(foreignKey = @ForeignKey(name = "expense_id"))
  @JsonIgnore
  @JsonBackReference
  private Expense expense;

  public ExpensePart(String name, String description, Double amount, User owner, User payee, Expense expense) {
    super(name, description);
    this.amount = amount;
    this.owner = owner;
    this.fullyPaid = false;
    this.payee = payee;
    this.expense = expense;
  }

  public ExpensePart(Expense expense) {
    super(expense.getName(), expense.getDescription());
    this.amount = expense.getAmount();
    this.owner = expense.getOwner();
    this.fullyPaid = false;
    this.payee = expense.getOwner();
    this.expense = expense;
  }

  @JsonIgnore
  public Set<User> getParticipants() {
    Set<User> participants = Set.of(this.owner, this.payee);
    return participants;
  }

  public boolean canView(User user) {
    return this.getParticipants().contains(user);
  }
}
