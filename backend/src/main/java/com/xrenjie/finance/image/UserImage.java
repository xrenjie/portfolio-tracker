package com.xrenjie.finance.image;

import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
public class UserImage extends Image {
  @Getter
  @ManyToOne
  private User user;

  public boolean canView(User user) {
    return true;
  }

}
