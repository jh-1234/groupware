package com.project.groupware.controller;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.dto.*;
import com.project.groupware.service.CommonService;
import com.project.groupware.service.EmployeeService;
import com.project.groupware.utils.PageObj;
import com.project.groupware.valid.groups.common.Save;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final CommonService commonService;

    private final EmployeeService employeeService;

    @GetMapping("/api/admin/employees")
    public ResponseEntity<PageObj<EmployeeDTO>> employees(SearchDTO dto, @PageableDefault Pageable pageable) {
        PageObj<EmployeeDTO> employees = employeeService.getAdminEmployees(dto, pageable);

        return ResponseEntity.ok(employees);
    }

    @GetMapping("/api/admin/employee/{empId}")
    public ResponseEntity<EmployeeDTO> employee(@PathVariable("empId") Long empId) {
        EmployeeDTO employee = employeeService.getEmployee(empId);

        return ResponseEntity.ok(employee);
    }

    @PostMapping("/api/admin/employee")
    public ResponseEntity<HttpStatus> saveEmployee(@RequestBody @Validated(Save.class) EmployeeDTO dto) {
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

    @GetMapping("/api/admin/employee-common-data")
    public ResponseEntity<Map<String, Object>> employeeCommonData() {
        List<DepartmentDTO> departments = commonService.getDepartments();
        List<PositionDTO> positions = commonService.getPositions();
        List<RoleDTO> roles = commonService.getRoles();
        List<StateDTO> states = commonService.getStates(StateKeys.MEMBER);

        return ResponseEntity.ok(Map.of(
                "departments", departments,
                "positions", positions,
                "roles", roles,
                "states", states
        ));
    }

    @GetMapping("/api/admin/employee/excel-download")
    public ResponseEntity<Resource> excelDownload(SearchDTO dto) {
        Resource resource = employeeService.getAdminEmployeesExcelData(dto);
        String filename = "사원목록-" + LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd")) + ".xlsx";
        String encodedFilename = UriComponentsBuilder.fromPath(filename).build().encode(StandardCharsets.UTF_8).toUriString();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFilename + "\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(resource);
    }
}
