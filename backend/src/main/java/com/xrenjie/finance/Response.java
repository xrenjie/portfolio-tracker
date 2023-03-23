package com.xrenjie.finance;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
public class Response {
  @Setter
  @Getter
  private JSONObject json;
  @Getter
  @Setter
  private JSONObject dataJson;

  public Response() {
    this.json = new JSONObject();
    this.dataJson = new JSONObject();
  }

  public Response success() {
    json.put("status", "success");
    return this;
  }

  public Response failed() {
    json.put("status", "failed");
    return this;
  }

  public Response add(String key, Object value) {
    dataJson.put(key, value);
    return this;
  }

  public String get(String key) {
    return json.get(key).toString();
  }

  public Response build() {
    json.put("data", dataJson);
    return this;
  }

  public String toString() {
    JSONObject string = new JSONObject(json);
    string.put("data", dataJson);
    return string.toString();
  }

  public ResponseEntity<JSONObject> status(HttpStatusCode status) {
    return new ResponseEntity(json, status);
  }


  public ResponseEntity<JSONObject> ok() {
    return ResponseEntity.ok(json);
  }

  public ResponseEntity<JSONObject> created() {
    return ResponseEntity.status(201).body(json);
  }

  public ResponseEntity<JSONObject> badRequest() {
    return ResponseEntity.badRequest().body(json);
  }

  public ResponseEntity<JSONObject> notFound() {
    return ResponseEntity.notFound().build();
  }

  public ResponseEntity<JSONObject> forbidden() {
    return ResponseEntity.status(403).body(json);
  }

  public ResponseEntity<JSONObject> internalServerError() {
    return ResponseEntity.status(500).body(json);
  }

  public ResponseEntity<JSONObject> unprocessableEntity() {
    return ResponseEntity.status(422).body(json);
  }

  public ResponseEntity<JSONObject> unauthorized() {
    return ResponseEntity.status(401).body(json);
  }

}
