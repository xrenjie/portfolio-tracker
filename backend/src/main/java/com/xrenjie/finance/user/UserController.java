package com.xrenjie.finance.user;

import com.xrenjie.finance.Response;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/v1/users")
@ControllerAdvice
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping(value="")
  public ResponseEntity<JSONObject>  registerUser(@RequestBody User user, @RequestHeader(name = "Authorization") String token) throws Exception {
    User u = userService.createNewUser(user, token);
    return new Response().success().add("user", u).build().ok();
  }

  @GetMapping(value="/{id}")
  public ResponseEntity<JSONObject> getUserById(@PathVariable(name="id") String id, @RequestHeader(name = "Authorization") String token) throws Exception{
    User user = userService.getUserById(id, token);
    return new Response().success().add("user", user).build().ok();
    //TODO: check if token user has relation with userID
    //TODO: make "friend" relation by using email

  }

  @GetMapping(value="/me")
  public ResponseEntity<JSONObject> getUser(@RequestHeader(name = "Authorization") String token) throws Exception{
    User user = userService.getUserByToken(token);
    return new Response().success().add("user", user).build().ok();
    //TODO: check if token user has relation with userID
    //TODO: make "friend" relation by using email

  }

  @PutMapping(value="/me")
  public ResponseEntity<JSONObject> updateUser(@RequestBody User user, @RequestHeader(name="Authorization") String token) throws Exception {
    User updatedUser = userService.updateUser(user, token);
    return new Response().success().add("user", updatedUser).build().ok();
  }

//  @PutMapping(value="/updateNetWorth")
//  public ResponseEntity<JSONObject> updateNetWorth(@RequestBody User user, @RequestHeader(name="Authorization") String token) throws Exception {
//    User updatedUser = userService.updateNetWorth(user, token);
//    return new Response().success().add("user", updatedUser).build().ok();
//  }
}
