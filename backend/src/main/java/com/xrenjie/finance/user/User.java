package com.xrenjie.finance.user;

import com.fasterxml.jackson.annotation.*;
import com.xrenjie.finance.AuditingEntity;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.expense.part.ExpensePart;
import com.xrenjie.finance.expense.payment.Payment;
import com.xrenjie.finance.folder.Folder;
import com.xrenjie.finance.image.Image;
import com.xrenjie.finance.image.UserImage;
import com.xrenjie.finance.usergroup.UserGroup;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@ToString(exclude={"payments", "expenses", "expenseParts", "folders", "userGroups", "ownedImages", "friends"})
@Table(name="finance_user")
@NoArgsConstructor
@JsonIgnoreProperties({"expenses", "expenseParts", "payments", "folders", "userGroups", "ownedImages", "friends"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User extends AuditingEntity {

  @Id @Getter @NonNull
  private String id;
  @Getter @NonNull @Setter
  private String firstname;
  @Getter @NonNull @Setter
  private String lastname;
  @Getter @NonNull @Setter
  private String email;
  @Getter @NonNull
  private Double netWorth = (double) 0;
  @Getter @Setter @NonNull
  private Instant timeNetWorthUpdated;
  @Getter
  @Setter
  @OneToOne
  private UserImage profileImage;
  @Getter
  @Setter
  @OneToMany
  @JsonIgnore
  private Set<Payment> payments = new HashSet<Payment>();
  @Getter
  @Setter
  @OneToMany(mappedBy = "owner",  cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @JsonManagedReference
  private Set<Expense> expenses = new HashSet<Expense>();
  @Getter
  @Setter
  @OneToMany
  @JsonIgnore
  @JsonManagedReference
  private Set<ExpensePart> expenseParts = new HashSet<ExpensePart>();
  @Getter
  @Setter
  @ManyToMany
  @JsonIgnore
  @JsonManagedReference
  private Set<Folder> folders= new HashSet<Folder>();
  @Getter
  @Setter
  @ManyToMany
  @JsonIgnore
  @JsonManagedReference
  private Set<UserGroup> userGroups = new HashSet<UserGroup>();
  @Getter
  @Setter
  @OneToMany
  @JsonIgnore
  @JsonManagedReference
  private Set<Image> ownedImages = new HashSet<Image>();
  @Getter
  @Setter
  @OneToMany
  @JsonIgnore
  @JsonManagedReference
  private Set<User> friends = new HashSet<User>();

  public User(String id) {
    this.id = id;
  }

  public User(String id, String firstname, String lastname, String email) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.profileImage = new UserImage();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof User)) return false;
    User user = (User) o;
    return (this.id == user.id && this.firstname == user.firstname &&
        this.lastname == user.lastname && this.email == user.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, firstname, lastname, email);
  }

  public String getId() {
    return this.id;
  }


  public Set<User> getFriends() {
    return this.friends;
  }

  public boolean canView(User user) {
    return this == user || this.friends.contains(user);
  }

  public void setNetWorth(Double netWorth) {
    if (this.netWorth != netWorth) {
      this.netWorth = netWorth;
      this.timeNetWorthUpdated = Instant.now();
    }
  }
}
