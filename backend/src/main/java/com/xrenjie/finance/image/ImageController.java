package com.xrenjie.finance.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/v1/images")
public class ImageController {

  @Autowired
  private ImageService imageService;

  @GetMapping(value="/{id}")
  public Image getImage(@PathVariable(name="id") Long id, @RequestHeader(name="Authorization") String token) throws Exception {
    return imageService.getImage(id, token);
  }

}
