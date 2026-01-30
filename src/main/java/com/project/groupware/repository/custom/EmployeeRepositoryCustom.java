package com.project.groupware.repository.custom;

import com.project.groupware.dto.EmployeeDTO;
import com.project.groupware.dto.SearchDTO;
import com.project.groupware.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface EmployeeRepositoryCustom {

    Optional<Employee> login(String username);

    Page<EmployeeDTO> getAdminEmployees(SearchDTO dto, Pageable pageable);
}
