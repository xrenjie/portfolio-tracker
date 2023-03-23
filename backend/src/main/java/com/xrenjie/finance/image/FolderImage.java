package com.xrenjie.finance.image;

import com.xrenjie.finance.folder.Folder;
import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class FolderImage extends Image {

  @Getter
  @ManyToOne
  private Folder folder;

  public boolean canView(User user) {
    if (this.getOwner() == user) return true;
    Set<User> participants = this.folder.getParticipants();
    return participants.contains(user);
  }
}
