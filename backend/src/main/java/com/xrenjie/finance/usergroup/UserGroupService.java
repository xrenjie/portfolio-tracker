package com.xrenjie.finance.usergroup;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.folder.Folder;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGroupService {

  @Autowired
  private UserGroupRepository userGroupRepository;
  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private UserService userService;


  public UserGroup getUserGroupById(Long id, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    UserGroup userGroup = userGroupRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException());

    if (!userGroup.canView(user)) throw new IllegalAccessException();
    return userGroup;
  }

  public UserGroup createUserGroup(UserGroup userGroup, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    if (!userGroupRepository.existsById(userGroup.getId())) {
      userGroup.setOwner(user);
      return userGroupRepository.save(userGroup);
    } else {
      throw new IllegalStateException();
    }
  }

  public UserGroup updateUserGroup(UserGroup userGroup, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    if (userGroupRepository.existsById(userGroup.getId())) {
      UserGroup oldUserGroup = userGroupRepository.findById(userGroup.getId())
          .orElseThrow(() -> new IllegalStateException());
      if (!oldUserGroup.canEdit(user)) throw new IllegalAccessException();
      return userGroupRepository.save(userGroup);
    } else {
      throw new IllegalStateException();
    }
  }

  public List<UserGroup> getUserGroups(String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalStateException();
    User user = userService.getUserByToken(token);
    return userGroupRepository.findAllByOwner(user);
  }

  public UserGroup groupUserOperation(Long groupId, String userId, String token, String operation) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    UserGroup group = userGroupRepository.findById(groupId)
        .orElseThrow(() -> new IllegalStateException());
    if (group.getOwner() != user) throw new IllegalAccessException();
    User newUser = userService.getUserById(userId, token);

    switch (operation) {
      case "add":
        return addUserToGroup(group, newUser);
      case "remove":
        return removeUserFromGroup(group, newUser);
      default:
        throw new IllegalStateException();
    }
  }

  private UserGroup removeUserFromGroup(UserGroup group, User newUser) {
    group.removeUser(newUser);
    return userGroupRepository.save(group);
  }

  private UserGroup addUserToGroup(UserGroup group, User newUser) {
    group.addUser(newUser);
    return userGroupRepository.save(group);
  }
}
