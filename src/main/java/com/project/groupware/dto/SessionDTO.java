package com.project.groupware.dto;

import com.project.groupware.entity.Employee;
import com.project.groupware.entity.File;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class SessionDTO {

    private Long empId;

    private String username;

    private String empName;

    private Integer deptId;

    private Long deptAuthValue;

    private Integer posId;

    private Long posAuthValue;

    private Integer roleId;

    private Long roleAuthValue;

    private String profileUrl;

    private String refreshToken;

    private Boolean isRememberMe;

    public static SessionDTO from(Employee employee) {
        SessionDTO session = new SessionDTO();
        session.setEmpId(employee.getEmpId());
        session.setUsername(employee.getUsername());
        session.setEmpName(employee.getEmpName());
        session.setDeptId(employee.getDepartment().getDeptId());
        session.setDeptAuthValue(employee.getDepartment().getDeptAuthValue());
        session.setPosId(employee.getPosition().getPosId());
        session.setPosAuthValue(employee.getPosition().getPosAuthValue());
        session.setRoleId(employee.getRole().getRoleId());
        session.setRoleAuthValue(employee.getRole().getRoleAuthValue());
        session.setProfileUrl(Optional.ofNullable(employee.getProfile()).map(File::getFileLoadPath).orElse(null));

        return session;
    }
}
