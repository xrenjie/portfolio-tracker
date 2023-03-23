package com.xrenjie.finance.folder;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.expense.Expense;
import com.xrenjie.finance.expense.ExpenseService;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class FolderService {

  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private FolderRepository folderRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private ExpenseService expenseService;


  public Folder createFolder(Folder folder, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    Folder newFolder = new Folder(folder, user);
    return folderRepository.save(newFolder);
  }

  public Folder getFolder(Long folderId, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    Folder folder = folderRepository.findById(folderId)
        .orElseThrow(() -> new IllegalStateException());
    if (!folder.canView(user)) throw new IllegalAccessException();
    return folder;
  }

  public Folder folderExpenseOperation(Long folderId, Long expenseId, String token, String operation) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    Folder folder = folderRepository.findById(folderId)
        .orElseThrow(() -> new IllegalStateException());
    if (folder.getOwner() != user) throw new IllegalAccessException();
    Expense expense = expenseService.getExpense(expenseId, token);

    switch (operation) {
      case "add":
        return addExpenseToFolder(folder, expense);
      case "remove":
        return removeExpenseFromFolder(folder, expense);
      default:
        throw new IllegalStateException();
    }
  }

  public Folder folderUserOperation(Long folderId, String userId, String token, String operation) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    Folder folder = folderRepository.findById(folderId)
        .orElseThrow(() -> new IllegalStateException());
    if (folder.getOwner() != user) throw new IllegalAccessException();
    User newUser = userService.getUserById(userId, token);

    switch (operation) {
      case "add":
        return addUserToFolder(folder, newUser);
      case "remove":
        return removeUserFromFolder(folder, newUser);
      default:
        throw new IllegalStateException();
    }
  }

  private Folder addExpenseToFolder(Folder folder, Expense expense) throws Exception {
    folder.addExpense(expense);
    return folderRepository.save(folder);
  }

  private Folder removeExpenseFromFolder(Folder folder, Expense expense) throws Exception {
    folder.removeExpense(expense);
    return folderRepository.save(folder);
  }

  private Folder addUserToFolder(Folder folder, User newUser) throws Exception {
    folder.addUser(newUser);
    return folderRepository.save(folder);
  }

  private Folder removeUserFromFolder(Folder folder, User newUser) throws Exception {
    folder.removeUser(newUser);
    return folderRepository.save(folder);
  }

  public List<Folder> getFolders(String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    return folderRepository.findAllByUsers(user);
  }
}
