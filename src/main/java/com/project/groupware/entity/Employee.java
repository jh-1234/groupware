package com.project.groupware.entity;

import com.project.groupware.converters.BooleanConverter;
import com.project.groupware.entity.auditing.BaseEntity;
import com.project.groupware.utils.CommonUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "TBL_EMPLOYEE")
@Getter
@Setter
public class Employee extends BaseEntity {

    @PrePersist
    public void prePersist() {
        this.telClean = CommonUtils.telClean(this.tel);
        this.isLocked = false;
        this.isDeleted = false;
    }

    @PreUpdate
    public void preUpdate() {
        this.telClean = CommonUtils.telClean(this.tel);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String empName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DEPT_ID", nullable = false)
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POS_ID", nullable = false)
    private Position position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATE_ID", nullable = false)
    private State state;

    private String email;

    @NotBlank
    private String tel;

    private String telClean;

    @NotNull
    private LocalDate birthday;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROFILE_ID")
    private File profile;

    @NotNull
    private LocalDate hireDate;

    private LocalDate resignDate;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "LOCK_YN")
    private Boolean isLocked;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
