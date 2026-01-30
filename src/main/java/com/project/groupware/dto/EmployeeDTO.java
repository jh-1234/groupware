package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeeDTO {

    private Long no;

    private Long empId;

    private String username;

    private String password;

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

    private String profileUrl;

    private LocalDate hireDate;

    private LocalDate resignDate;
}
