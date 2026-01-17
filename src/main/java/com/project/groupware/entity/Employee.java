package com.project.groupware.entity;

import com.project.groupware.converters.BooleanConverter;
import com.project.groupware.entity.auditing.BaseEntity;
import com.project.groupware.utils.CommonUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "TBL_EMPLOYEE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Employee extends BaseEntity {

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

    @Builder
    public Employee(String username, String password, String empName, Department department, Position position, Role role, State state, String email, String tel, LocalDate birthday, File profile, LocalDate hireDate, LocalDate resignDate) {
        this.username = username;
        this.password = password;
        this.empName = empName;
        this.department = department;
        this.position = position;
        this.role = role;
        this.state = state;
        this.email = email;
        this.tel = tel;
        this.birthday = birthday;
        this.profile = profile;
        this.hireDate = hireDate;
        this.resignDate = resignDate;
        this.isLocked = false;
        this.isDeleted = false;
    }

    @PrePersist
    @PreUpdate
    public void init() {
        this.telClean = CommonUtils.telClean(this.tel);
    }

    public void delete() {
        this.isDeleted = true;
    }
}
