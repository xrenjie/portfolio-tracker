package com.xrenjie.finance.usergroup;

import com.xrenjie.finance.folder.Folder;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/v1/groups")
public class UserGroupController {

  @Autowired
  private UserGroupService userGroupService;

  @GetMapping(value="/{id}")
  public UserGroup getUserGroupById(@PathVariable(name="id") Long id, @RequestHeader(name="Authorization") String token) throws Exception {
    return userGroupService.getUserGroupById(id, token);
  }

  @GetMapping(value="/me")
  public List<UserGroup> getUserGroups(@RequestHeader(name="Authorization") String token) throws Exception {
    return userGroupService.getUserGroups(token);
  }

  @PostMapping(value="")
  public UserGroup createUserGroup(@RequestBody UserGroup userGroup, @RequestHeader(name="Authorization") String token) throws Exception {
    return userGroupService.createUserGroup(userGroup, token);
  }

  @PutMapping(value="")
  public UserGroup updateUserGroup(@RequestBody UserGroup userGroup, @RequestHeader(name="Authorization") String token) throws Exception {
    return userGroupService.updateUserGroup(userGroup, token);
  }

  @PostMapping(value="/{groupId}/users")
  public ResponseEntity<Folder> userOp(@RequestBody String body, @RequestHeader(name = "Authorization") String token, @PathVariable(name="groupId") Long folderId) throws Exception {
    JSONParser parser = new JSONParser();
    JSONObject json = (JSONObject) parser.parse(body);
    String operation = (String) json.get("operation");
    String userId = (String) json.get("userId");
    UserGroup group = userGroupService.groupUserOperation(folderId, userId, token, operation);
    return new ResponseEntity(group, HttpStatus.OK);
  }
}
