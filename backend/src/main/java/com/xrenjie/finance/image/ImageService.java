package com.xrenjie.finance.image;

import com.xrenjie.finance.auth.TokenValidator;
import com.xrenjie.finance.user.User;
import com.xrenjie.finance.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

  @Autowired
  private TokenValidator tokenValidator;
  @Autowired
  private ImageRepository imageRepository;
  @Autowired
  private UserService userService;

  public Image getImage(Long id, String token) throws Exception {
    if (!tokenValidator.isValidToken(token)) throw new IllegalAccessException();
    User user = userService.getUserByToken(token);
    Image image = imageRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException());
    if (!image.canView(user)) throw new IllegalAccessException();
    return image;
  }
}
