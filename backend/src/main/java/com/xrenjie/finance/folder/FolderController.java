package com.xrenjie.finance.folder;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/v1/folders")
@ControllerAdvice
public class FolderController {

  @Autowired
  private FolderService folderService;

  @PostMapping(value="")
  public ResponseEntity<Folder> createFolder(@RequestBody Folder folder, @RequestHeader(name = "Authorization") String token) throws Exception {
    Folder f = folderService.createFolder(folder, token);
    return new ResponseEntity(f, HttpStatus.OK);
  }

  @GetMapping(value="/{id}")
  public ResponseEntity<Folder> getFolder(@PathVariable(name="id") Long id, @RequestHeader(name = "Authorization") String token) throws Exception {
    Folder f = folderService.getFolder(id, token);
    return new ResponseEntity(f, HttpStatus.OK);
  }

  @GetMapping(value="/me")
  public ResponseEntity<List<Folder>> getFoldersByOwner(@RequestHeader(name = "Authorization") String token) throws Exception {
    List<Folder> f = folderService.getFolders(token);
    return new ResponseEntity(f, HttpStatus.OK);
  }

  @PostMapping(value="/{folderId}/users")
  public ResponseEntity<Folder> userOp(@RequestBody String body, @RequestHeader(name = "Authorization") String token, @PathVariable(name="folderId") Long folderId) throws Exception {
    JSONParser parser = new JSONParser();
    JSONObject json = (JSONObject) parser.parse(body);
    String operation = (String) json.get("operation");
    String userId = (String) json.get("userId");
    Folder f = folderService.folderUserOperation(folderId, userId, token, operation);
    return new ResponseEntity(f, HttpStatus.OK);
  }

  @PostMapping(value="/{folderId}/expenses")
  public ResponseEntity<Folder> expenseOp(@RequestBody String body, @RequestHeader(name = "Authorization") String token, @PathVariable(name="folderId") Long folderId) throws Exception {
    JSONParser parser = new JSONParser();
    JSONObject json = (JSONObject) parser.parse(body);
    String operation = (String) json.get("operation");
    Long expenseId = (Long) json.get("expenseId");
    Folder f = folderService.folderExpenseOperation(folderId, expenseId, token, operation);
    return new ResponseEntity(f, HttpStatus.OK);
  }
}
