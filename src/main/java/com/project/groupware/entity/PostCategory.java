package com.project.groupware.entity;

import com.project.groupware.entity.auditing.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_POST_CATEGORY")
@Getter
@Setter
public class PostCategory extends BaseEntity {

    @PrePersist
    public void prePersist() {
        this.isDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cateId;

    @NotBlank
    private String cateName;

    @NotNull
    private Integer sortOrder;

    @NotNull
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
