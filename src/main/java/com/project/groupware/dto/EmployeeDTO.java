package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeeDTO {

    private Long empId;

    private String username;

    private String empName;

    private Integer deptId;

    private String deptName;

    private Integer posId;

    private String posName;

    private Integer roleId;

    private String roleName;

    private Integer stateId;

    private String stateName;

    private String email;

    private String tel;

    private LocalDate birthday;

    private String profileLoadPath;

    private LocalDate hireDate;

    private LocalDate resignDate;
}
