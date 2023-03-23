package com.xrenjie.finance.expense;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.xrenjie.finance.expense.part.ExpensePart;
import com.xrenjie.finance.generic.DefaultNameDescription;
import com.xrenjie.finance.image.ExpenseImage;
import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@ToString(exclude={ "images", "expenseParts"})
@Table(name="expense")
@JsonIgnoreProperties({"owner", "images", "expenseParts"})
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Expense extends DefaultNameDescription {

  public enum RecurringFrequency {
    DAILY("daily"),
    WEEKLY("weekly"),
    MONTHLY("monthly"),
    YEARLY("yearly");

    private String frequency;

    private RecurringFrequency(String frequency) {
      this.frequency = frequency;
    }

    public String getFrequency() {
      return frequency;
    }

    public void setFrequency(String frequency) {
      this.frequency = frequency;
    }

    @Override
    public String toString() {
      return frequency;
    }
  }

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id")
  @Getter
  @Setter @NonNull
  private Long id;
  @Setter
  @Getter @NonNull
  @ManyToOne
  @JsonIgnore
  private User owner;
  @Getter
  @Setter @NonNull
  private Double amount;
  @Setter
  @Getter
  @OneToMany(mappedBy = "id") // mappedBy indicates that this side is the
  @JsonIgnore
  private Set<ExpenseImage> images = new HashSet<ExpenseImage>();
  @Getter
  @Setter
  @Column(name = "fully_paid", nullable = false, columnDefinition = "boolean default false")
  private Boolean fullyPaid = false;
  @Getter
  @Setter
  @OneToMany(mappedBy="id", cascade = CascadeType.ALL)
  @JsonIgnore
  private Set<ExpensePart> expenseParts = new HashSet<ExpensePart>();
  @Getter
  @Setter @NonNull
  private Date date;
  @Getter
  @Setter
  private Boolean isRecurring = false;
  @Getter
  @Setter
  private Integer numberOfTimesToRecur = 0;
  @Getter
  @Setter
  private RecurringFrequency recurringFrequency;
  @Getter
  @Setter
  private Date recurringEndDate;
  @Getter
  @Setter
  private Integer timesLeftToRecur = 0;
  @Getter
  @Setter
  private Boolean isCreatedFromRecurring = false;
  @Getter
  @Setter
  private Long recurringExpenseId;
  @Getter
  @Setter
  private Date dateLastRecurred;

  public Expense(String name, String description, Double amount, User owner) {
    super(name, description);
    this.amount = amount;
    this.owner = owner;
    this.fullyPaid = false;
  }

  public Expense (Expense oldExpense) {
    super(oldExpense.getName(), oldExpense.getDescription());
    this.amount = oldExpense.getAmount();
    this.owner = oldExpense.getOwner();
    this.fullyPaid = oldExpense.getFullyPaid();
    this.date = oldExpense.getDate();
    this.isRecurring = oldExpense.getIsRecurring();
    this.numberOfTimesToRecur = oldExpense.getNumberOfTimesToRecur();
    this.recurringFrequency = oldExpense.getRecurringFrequency();
    this.recurringEndDate = oldExpense.getRecurringEndDate();
    this.timesLeftToRecur = oldExpense.getTimesLeftToRecur();
    this.isCreatedFromRecurring = oldExpense.getIsCreatedFromRecurring();
    this.recurringExpenseId = oldExpense.getRecurringExpenseId();
    this.images = oldExpense.getImages();
  }

  public Expense makeRecurrence(Date date) {
    this.setIsCreatedFromRecurring(true);
    this.setRecurringExpenseId(this.getId());
    this.setTimesLeftToRecur(0);
    this.setIsRecurring(false);
    this.setDate(date);
    return this;
  }

  public void decrementRecurringTimesLeft() {
    if (this.numberOfTimesToRecur > 0) {
      this.timesLeftToRecur--;
    }
  }

  public String getOwnerID() {
    return this.owner.getId();
  }

  @JsonIgnore
  public Set<User> getParticipants() {
    Set participants = this.expenseParts.stream().map(part -> part.getParticipants()).collect(Collectors.toSet());
    participants.add(this.owner);
    return participants;
  }

  public boolean canView(User user) {
    return this.getParticipants().contains(user);
  }

  public void addExpensePart() {
    ExpensePart newPart = new ExpensePart(this);
    this.expenseParts.add(newPart);
  }
  public void addExpensePart(ExpensePart part) {
    this.expenseParts.add(part);
  }

}
