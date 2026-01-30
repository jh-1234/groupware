package com.project.groupware.service;

import com.project.groupware.constants.MemberConstants;
import com.project.groupware.dto.EmployeeDTO;
import com.project.groupware.dto.SearchDTO;
import com.project.groupware.entity.Employee;
import com.project.groupware.repository.EmployeeRepository;
import com.project.groupware.utils.PageObj;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final PasswordEncoder passwordEncoder;

    private final CommonService commonService;

    public Optional<Employee> getActiveEmployee(Long empId) {
        return employeeRepository.findByEmpIdAndState_StateIdAndIsLockedFalseAndIsDeletedFalse(empId, MemberConstants.State.EMPLOYED.getValue());
    }

    public Optional<Employee> getEmployee(Long empId) {
        return employeeRepository.findByEmpId(empId);
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
        employee.setDepartment(commonService.getDepartment(dto.getDeptId()).orElseThrow());
        employee.setPosition(commonService.getPosition(dto.getPosId()).orElseThrow());
        employee.setRole(commonService.getRole(dto.getRoleId()).orElseThrow());
        employee.setState(commonService.getState(dto.getStateId()).orElseThrow());
        employee.setEmail(dto.getEmail());
        employee.setTel(dto.getTel());
        employee.setBirthday(dto.getBirthday());
        employee.setHireDate(dto.getHireDate());
        employee.setResignDate(dto.getResignDate());

        employeeRepository.save(employee);
    }

    public void deleteEmployee(Long empId) {
        Employee employee = getEmployee(empId).orElseThrow();
        employee.setIsDeleted(true);
    }
}
