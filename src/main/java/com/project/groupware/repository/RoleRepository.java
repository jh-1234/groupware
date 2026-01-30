package com.project.groupware.repository;

import com.project.groupware.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoleIdAndIsDeletedFalse(Integer roleId);

    List<Role> findAllByIsDeletedFalseOrderBySortOrderAsc();
}
