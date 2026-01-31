package com.project.groupware.service;

import com.project.groupware.constants.EmployeeConstants;
import com.project.groupware.dto.EmployeeDTO;
import com.project.groupware.dto.SearchDTO;
import com.project.groupware.entity.Employee;
import com.project.groupware.repository.EmployeeRepository;
import com.project.groupware.utils.PageObj;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final PasswordEncoder passwordEncoder;

    private final CommonService commonService;

    public Optional<Employee> findByActiveEmployee(Long empId) {
        return employeeRepository.findByEmpIdAndState_StateIdAndIsLockedFalseAndIsDeletedFalse(empId, EmployeeConstants.State.EMPLOYED.getValue());
    }

    public Optional<Employee> findByEmployee(Long empId) {
        return employeeRepository.findByEmpIdAndIsDeletedFalse(empId);
    }

    public EmployeeDTO getEmployee(Long empId) {
        return findByEmployee(empId).map(employee -> {
            EmployeeDTO dto = new EmployeeDTO();
            dto.setEmpId(employee.getEmpId());
            dto.setEmpName(employee.getEmpName());
            dto.setTel(employee.getTel());
            dto.setUsername(employee.getUsername());
            dto.setGender(employee.getGender().getType());
            dto.setBirthday(employee.getBirthday());
            dto.setEmail(employee.getEmail());
            dto.setDeptId(employee.getDepartment().getDeptId());
            dto.setPosId(employee.getPosition().getPosId());
            dto.setRoleId(employee.getRole().getRoleId());
            dto.setStateId(employee.getState().getStateId());
            dto.setHireDate(employee.getHireDate());
            dto.setResignDate(employee.getResignDate());

            return dto;
        }).orElseThrow();
    }

    public PageObj<EmployeeDTO> getAdminEmployees(SearchDTO dto, Pageable pageable) {
        Page<EmployeeDTO> employees = employeeRepository.getAdminEmployees(dto, pageable);

        return new PageObj<>(employees);
    }

    public void saveEmployee(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setUsername(dto.getUsername());
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        employee.setEmpName(dto.getEmpName());
        employee.setDepartment(commonService.findByDepartment(dto.getDeptId()).orElseThrow());
        employee.setPosition(commonService.findByPosition(dto.getPosId()).orElseThrow());
        employee.setRole(commonService.findByRole(dto.getRoleId()).orElseThrow());
        employee.setState(commonService.findByState(dto.getStateId()).orElseThrow());
        employee.setEmail(dto.getEmail());
        employee.setTel(dto.getTel());
        employee.setGender(EmployeeConstants.Gender.getGender(dto.getGender()));
        employee.setBirthday(dto.getBirthday());
        employee.setHireDate(dto.getHireDate());
        employee.setResignDate(dto.getResignDate());

        employeeRepository.save(employee);
    }

    public void deleteEmployee(Long empId) {
        Employee employee = findByEmployee(empId).orElseThrow();
        employee.setIsDeleted(true);
    }

    public Resource getAdminEmployeesExcelData(SearchDTO dto) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet();

            CellStyle headerStyle = getHeaderStyle(workbook);
            CellStyle bodyStyle = getBodyStyle(workbook);

            Row header = sheet.createRow(0);
            String[] headers = {"NO", "이름", "부서", "직위", "권한", "연락처", "상태"};
            int[] width = {2000, 3000, 3000, 3000, 3000, 5000, 3000};

            for (int i = 0; i < headers.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);

                sheet.setColumnWidth(i, width[i]);
            }

            List<EmployeeDTO> employees = employeeRepository.getAdminEmployeesExcelData(dto);

            for (int i = 0; i < employees.size(); i++) {
                Row row = sheet.createRow(i + 1);
                EmployeeDTO employee = employees.get(i);

                createCellWithStyle(row, 0, String.valueOf(employee.getNo()), bodyStyle);
                createCellWithStyle(row, 1, employee.getEmpName(), bodyStyle);
                createCellWithStyle(row, 2, employee.getDeptName(), bodyStyle);
                createCellWithStyle(row, 3, employee.getPosName(), bodyStyle);
                createCellWithStyle(row, 4, employee.getRoleName(), bodyStyle);
                createCellWithStyle(row, 5, employee.getTel(), bodyStyle);
                createCellWithStyle(row, 6, employee.getStateName(), bodyStyle);
            }

            workbook.write(out);

            return new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private CellStyle getHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());

        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);

        return style;
    }

    private CellStyle getBodyStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);

        return style;
    }

    private void createCellWithStyle(Row row, int column, String value, CellStyle style) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value != null ? value : "");
        cell.setCellStyle(style);
    }
}
