package com.project.groupware.controller;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.dto.*;
import com.project.groupware.service.AdminService;
import com.project.groupware.service.EmployeeService;
import com.project.groupware.utils.PageObj;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    private final EmployeeService employeeService;

    @GetMapping("/api/admin/employees")
    public ResponseEntity<PageObj<EmployeeDTO>> employees(SearchDTO dto, @PageableDefault Pageable pageable) {
        PageObj<EmployeeDTO> employees = employeeService.getAdminEmployees(dto, pageable);

        return ResponseEntity.ok(employees);
    }

    @PostMapping("/api/admin/employee")
    public ResponseEntity<HttpStatus> saveEmployee(@RequestBody EmployeeDTO dto) {
        employeeService.saveEmployee(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/api/admin/employee")
    public ResponseEntity<HttpStatus> updateEmployee(@RequestBody EmployeeDTO dto) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/admin/employee/{empId}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable("empId") Long empId) {
        employeeService.deleteEmployee(empId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/admin/employee-search-data")
    public ResponseEntity<Map<String, Object>> employeeSearchData() {
        List<DepartmentDTO> departments = adminService.getDepartments();
        List<PositionDTO> positions = adminService.getPositions();
        List<RoleDTO> roles = adminService.getRoles();
        List<StateDTO> states = adminService.getStates(StateKeys.MEMBER);

        return ResponseEntity.ok(Map.of(
                "departments", departments,
                "positions", positions,
                "roles", roles,
                "states", states
        ));
    }
}
