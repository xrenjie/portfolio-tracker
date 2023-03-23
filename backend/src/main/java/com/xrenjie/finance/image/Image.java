package com.xrenjie.finance.image;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.xrenjie.finance.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Table(name = "image")
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Image {
  @Id
  @GeneratedValue
  @Column(name = "id")
  @Getter
  private Long id;
  @Getter
  @Setter
  private String url = "";
  @Getter
  @Setter
  @ManyToOne
  @JsonBackReference
  private User owner;

  public abstract boolean canView(User user);
}