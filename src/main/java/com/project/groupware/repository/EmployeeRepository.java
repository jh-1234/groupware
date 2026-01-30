package com.project.groupware.repository;

import com.project.groupware.entity.Employee;
import com.project.groupware.repository.custom.EmployeeRepositoryCustom;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, EmployeeRepositoryCustom {

    @EntityGraph(attributePaths = {"department", "position", "role", "state", "profile"})
    Optional<Employee> findByEmpIdAndState_StateIdAndIsLockedFalseAndIsDeletedFalse(Long empId, Integer stateId);

    Optional<Employee> findByEmpId(Long empId);
}
