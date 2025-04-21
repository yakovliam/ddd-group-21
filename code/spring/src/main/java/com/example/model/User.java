package com.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;

@Entity(name = "User")
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(generator = "UUID")
  @UuidGenerator
  private UUID id;

  @Column(name = "username", nullable = false, unique = true)
  private String username;

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
