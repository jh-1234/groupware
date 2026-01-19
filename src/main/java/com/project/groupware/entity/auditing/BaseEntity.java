package com.project.groupware.entity.auditing;

import com.project.groupware.custom.CustomAuditingEntityListener;
import com.project.groupware.custom.auditing.CreatedById;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(CustomAuditingEntityListener.class)
@Getter
public abstract class BaseEntity extends TimeEntity {

    @CreatedById
    @Column(updatable = false)
    @NotNull
    private Long createdId;
}
