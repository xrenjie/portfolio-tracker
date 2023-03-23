package com.xrenjie.finance;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditingEntity {

  @Column(name="CREATED_DATE", updatable=false, nullable=true)
  @CreatedDate
  @Temporal(TemporalType.TIMESTAMP)
  @Getter
  protected Instant createdDate;

  @Column(name="MODIFIED_DATE", updatable=true, nullable=true)
  @LastModifiedDate
  @Temporal(TemporalType.TIMESTAMP)
  @Getter
  @Setter
  protected Instant modifiedDate;

}
