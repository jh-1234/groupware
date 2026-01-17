package com.project.groupware.repository.custom;

import com.project.groupware.entity.Employee;

import java.util.Optional;

public interface EmployeeRepositoryCustom {

    Optional<Employee> login(String username);
}
