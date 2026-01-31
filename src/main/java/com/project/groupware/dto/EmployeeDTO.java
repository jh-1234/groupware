package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.groupware.constants.ValidationType;
import com.project.groupware.utils.CommonUtils;
import com.project.groupware.valid.CustomValidation;
import com.project.groupware.valid.groups.common.Save;
import com.project.groupware.valid.groups.common.Update;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeeDTO {

    private Long no;

    @NotNull(groups = {Update.class})
    private Long empId;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "아이디", min = 6, max = 20, nullable = false, checkType = ValidationType.ALPHA_NUMERIC, groups = {Save.class, Update.class})
    private String username;

    @CustomValidation(name = "비밀번호", min = 8, max = 100, nullable = false, checkType = ValidationType.PASSWORD, groups = {Save.class})
    private String password;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "이름", min = 1, max = 15, nullable = false, groups = {Save.class, Update.class})
    private String empName;

    @NotNull(message = "부서를 선택해주세요.", groups = {Save.class, Update.class})
    private Integer deptId;

    private String deptName;

    @NotNull(message = "직위를 선택해주세요.", groups = {Save.class, Update.class})
    private Integer posId;

    private String posName;

    @NotNull(message = "권한을 선택해주세요.", groups = {Save.class, Update.class})
    private Integer roleId;

    private String roleName;

    @NotNull(message = "재직 상태를 선택해주세요.", groups = {Save.class, Update.class})
    private Integer stateId;

    private String stateName;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "E-Mail", max = 50, checkType = ValidationType.EMAIL, groups = {Save.class, Update.class})
    private String email;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "연락처", min = 1, max = 15, nullable = false, checkType = ValidationType.TEL, groups = {Save.class, Update.class})
    private String tel;

    @NotBlank(message = "성별을 선택해주세요.", groups = {Save.class, Update.class})
    private String gender;

    @NotNull(message = "생년월일을 선택해주세요.", groups = {Save.class, Update.class})
    private LocalDate birthday;

    private String profileUrl;

    @NotNull(message = "입사일을 선택해주세요.", groups = {Save.class, Update.class})
    private LocalDate hireDate;

    private LocalDate resignDate;

    public void setUsername(String username) {
        this.username = CommonUtils.strip(username);
    }

    public void setEmpName(String empName) {
        this.empName = CommonUtils.strip(empName);
    }

    public void setTel(String tel) {
        this.tel = CommonUtils.strip(tel);
    }

    public void setEmail(String email) {
        this.email = CommonUtils.strip(email);
    }
}
