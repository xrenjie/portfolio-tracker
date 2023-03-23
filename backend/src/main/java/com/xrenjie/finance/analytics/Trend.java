package com.xrenjie.finance.analytics;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

import java.util.Date;

public class Trend {

  private JSONArray data;
  private String nameX;
  private String nameY;

  public Trend() {
    data = new JSONArray();
  }

  public Trend(String nameX, String nameY) {
    this();
    this.nameX = nameX;
    this.nameY = nameY;
  }

  public Trend addData(JSONObject data) {
    this.data.add(data);
    return this;
  }

  public Trend addPair(Object x, Object y) {
    JSONObject data = new JSONObject();
    data.put(this.nameX, x);
    data.put(this.nameY, y);
    this.data.add(data);
    return this;
  }

  public Pair pair(Object x, Object y) {
    return new Pair(x, y);
  }

  public void sortAscending() {
    this.data.sort((o1, o2) -> {
      if (o1 instanceof JSONObject && o2 instanceof JSONObject) {
        JSONObject o1Json = (JSONObject) o1;
        JSONObject o2Json = (JSONObject) o2;
        if (o1Json.get(nameX) instanceof Number && o2Json.get(nameX) instanceof Number) {
          Number o1X = (Number) o1Json.get(nameX);
          Number o2X = (Number) o2Json.get(nameX);
          return o1X.intValue() - o2X.intValue();
        } else if (o1Json.get(nameX) instanceof Date && o2Json.get(nameX) instanceof Date) {
          Date o1X = (Date) o1Json.get(nameX);
          Date o2X = (Date) o2Json.get(nameX);
          return o1X.compareTo(o2X);
        } else {
          Object o1X = o1Json.get(nameX);
          Object o2X = o2Json.get(nameX);
          return o1X.toString().compareTo(o2X.toString());
        }
      }
      return 0;
    });
  }

  public Object getJson() {
    return this.data;
  }

  private class Pair {
    private Object x;
    private Object y;

    public Pair(Object x, Object y) {
      this.x = x;
      this.y = y;
    }
  }
}
