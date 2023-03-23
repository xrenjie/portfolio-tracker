package com.xrenjie.finance.analytics;

import com.xrenjie.finance.Response;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/v1/statistics")
@ControllerAdvice
public class StatisticsController {

  @Autowired
  private StatisticsService statisticsService;

  @GetMapping(value="/netWorth")
  public ResponseEntity<JSONObject> getNetWorthTrend(@RequestHeader(name = "Authorization") String token) {
    try {
      Trend trend = statisticsService.getNetWorthTrend(token);
      return new Response().success().add("trend", trend.getJson()).build().ok();
    } catch (Exception e) {
      return new Response().failed().add("error", e.getMessage()).build().ok();
    }
  }
}
