package com.example.controller;

import com.example.model.UserRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin
public class UserController {

  private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(UserController.class);

  private final UserRepository userRepository;

  @Autowired
  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping
  public ResponseEntity<Object> index() {
    return ResponseEntity.ok("Hello World!");
  }

  @GetMapping("/users")
  public ResponseEntity<Object> getAllUsers() {
    LOGGER.info("Getting all users");

    return ResponseEntity.ok(userRepository.findAll());
  }

  @GetMapping("/users-with-authentication")
  public ResponseEntity<Object> getAllAuthenticatedUsers(@AuthenticationPrincipal Jwt jwt) {
    LOGGER.info("Authenticated user: {}, Getting all users", jwt.getSubject());

    return ResponseEntity.ok(userRepository.findAll());
  }
}
