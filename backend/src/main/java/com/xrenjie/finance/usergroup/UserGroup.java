package com.xrenjie.finance.usergroup;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xrenjie.finance.generic.DefaultNameDescription;
import com.xrenjie.finance.image.Image;
import com.xrenjie.finance.image.UserGroupImage;
import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@ToString
@Table(name = "user_group")
@NoArgsConstructor
public class UserGroup extends DefaultNameDescription {

  @Getter
  @Id @NonNull
  @GeneratedValue
  private Long id;
  @Getter
  @Setter @NonNull
  @ManyToOne
  @JsonBackReference
  private User owner;
  @Getter
  @OneToOne
  private UserGroupImage image;
  @ManyToMany
  @Getter
  @Setter
  private Set<User> members = new HashSet<User>();

  public UserGroup(String name, String description) {
    super(name, description);
  }

  @JsonIgnore
  public Set<User> getParticipants() {
    Set<User> participants = this.members;
    participants.add(this.owner);
    return participants;
  }

  public boolean canView(User user) {
    return this.getParticipants().contains(user);
  }

  public boolean canEdit(User user) {
    return user == this.owner;
  }

  public void removeUser(User newUser) {
    this.members.remove(newUser);
  }

  public void addUser(User newUser) {
    this.members.add(newUser);
  }
}
