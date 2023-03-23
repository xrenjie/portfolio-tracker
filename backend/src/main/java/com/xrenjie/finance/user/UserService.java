package com.xrenjie.finance.user;

import com.xrenjie.finance.auth.TokenValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
@Component
public class UserService {

  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private UserRepository userRepository;

  public User createNewUser(User user, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();

    Optional<User> existing = userRepository.findById(user.getId());
    if (existing.isPresent()) return existing.get();
    return userRepository.save(user);
  }

  public User getUserByToken(String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    String userID = tokenValidator.getTokenSubject(token);
    return userRepository.findById(userID)
        .orElseThrow(() -> new IllegalStateException());
  }

  //TODO: Check if user id has relation with token user
  public User getUserById(String userId, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    // TODO: check if token user has relation with userID
    return userRepository.findById(userId)
        .orElseThrow(() -> new IllegalStateException());

  }

  //only use this to update name, email, net worth and time net worth updated
  public User updateUser(User user, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    if (!tokenValidator.authenticateUserWithToken(user.getId(), token)) throw new IllegalAccessException();

    User existing = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalStateException());
    existing.setFirstname(user.getFirstname());
    existing.setLastname(user.getLastname());
    existing.setEmail(user.getEmail());
    existing.setNetWorth(user.getNetWorth());
    existing.setTimeNetWorthUpdated(user.getTimeNetWorthUpdated());

    return userRepository.save(existing);
  }

  public User updateNetWorth(User user, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    if (!tokenValidator.authenticateUserWithToken(user.getId(), token)) throw new IllegalAccessException();

    user.setNetWorth(user.getNetWorth());
    return userRepository.save(user);
  }


//  public User updateUser(User user, String token) throws Exception {
//    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
//    if (!tokenValidator.authenticateUserWithToken(user.getUserID(), token)) throw new IllegalAccessException();
//
//    return userRepository.save(user);
//  }
}
