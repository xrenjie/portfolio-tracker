package com.xrenjie.finance.image;

import com.xrenjie.finance.user.User;
import com.xrenjie.finance.usergroup.UserGroup;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
public class UserGroupImage extends Image {

  @Getter
  @ManyToOne
  private UserGroup userGroup;

  public boolean canView(User user) {
    if (this.getOwner() == user) return true;
    Set<User> participants = this.userGroup.getParticipants();
    return participants.contains(user);
  }

}
