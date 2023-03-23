package com.xrenjie.finance.folder;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.generic.DefaultNameDescription;
import com.xrenjie.finance.image.FolderImage;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.usergroup.UserGroup;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@ToString
@Table(name="folder")
public class Folder extends DefaultNameDescription {

  @Getter
  @Id
  @GeneratedValue
  private Long id;
  @Getter
  @Setter
  @ManyToOne
  @JsonBackReference
  private User owner;
  @Getter
  @Setter
  @OneToOne
  private FolderImage image;
  @Getter
  @Setter
  @ManyToMany
  private Set<Expense> expenses = new HashSet<Expense>();
  @Getter
  @Setter
  @ManyToMany
  private Set<User> users = new HashSet<User>();

  public Folder(String name, String description) {
    super(name, description);
  }

  public Folder() {
    super();
  }

  public Folder(Folder folder,User user) {
    super(folder.getName(), folder.getDescription());
    this.owner = user;
  }

  public boolean canView(User user) {
    return this.owner == user || this.users.contains(user);
  }

  public void addExpense(Expense expense) {
    this.expenses.add(expense);
  }

  public void addUser(User newUser) {
    this.users.add(newUser);
  }

  public void removeUser(User user) {
    this.users.remove(user);
  }

  public void removeExpense(Expense expense) {
    this.expenses.remove(expense);
  }

  @JsonIgnore
  public Set<User> getParticipants() {
    Set<User> participants = this.users;
    participants.add(this.owner);
    return participants;
  }
}
