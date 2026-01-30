package com.project.groupware.repository;

import com.project.groupware.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

    Optional<Department> findByDeptIdAndIsDeletedFalse(Integer deptId);

    List<Department> findAllByIsDeletedFalseOrderBySortOrderAsc();
}
