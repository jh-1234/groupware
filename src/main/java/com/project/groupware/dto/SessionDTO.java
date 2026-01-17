package com.project.groupware.dto;

import com.project.groupware.entity.Employee;
import lombok.Builder;

@Builder(toBuilder = true)
public record SessionDTO(Long empId,
                         String username,
                         String empName,
                         Integer deptId,
                         Long deptAuthValue,
                         Integer posId,
                         Long posAuthValue,
                         Integer roleId,
                         Long roleAuthValue,
                         String refreshToken) {

    public static SessionDTO from(Employee employee) {
        return SessionDTO.builder()
                .empId(employee.getEmpId())
                .username(employee.getUsername())
                .empName(employee.getEmpName())
                .deptId(employee.getDepartment().getDeptId())
                .deptAuthValue(employee.getDepartment().getDeptAuthValue())
                .posId(employee.getPosition().getPosId())
                .posAuthValue(employee.getPosition().getPosAuthValue())
                .roleId(employee.getRole().getRoleId())
                .roleAuthValue(employee.getRole().getRoleAuthValue())
                .build();
    }
}
