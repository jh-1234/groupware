package com.project.groupware.service;

import com.project.groupware.entity.Employee;
import com.project.groupware.enums.MemberState;
import com.project.groupware.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Optional<Employee> getActiveEmployee(Long empId) {
        return employeeRepository.findByEmpIdAndState_StateIdAndIsLockedFalseAndIsDeletedFalse(empId, MemberState.EMPLOYED.getValue());
    }
}
