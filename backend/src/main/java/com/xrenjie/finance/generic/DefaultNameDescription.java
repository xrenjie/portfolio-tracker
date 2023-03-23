package com.xrenjie.finance.generic;

import com.xrenjie.finance.AuditingEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@MappedSuperclass
public class DefaultNameDescription extends AuditingEntity {

  @Getter
  @Setter @NonNull
  private String name;
  @Getter
  @Setter
  private String description;

  public DefaultNameDescription(String name, String description) {
    this.name = name;
    this.description = description;
  }

  public DefaultNameDescription() {
  }
}
