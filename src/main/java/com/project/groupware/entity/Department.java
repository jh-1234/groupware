package com.project.groupware.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_DEPARTMENT")
@Getter
@Setter
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deptId;

    @NotBlank
    private String deptName;

    @NotNull
    private Long deptAuthValue;

    @NotNull
    private Integer sortOrder;

    @NotNull
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
