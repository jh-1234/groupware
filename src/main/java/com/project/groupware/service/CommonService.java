package com.project.groupware.service;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.entity.Department;
import com.project.groupware.entity.Position;
import com.project.groupware.entity.Role;
import com.project.groupware.entity.State;
import com.project.groupware.repository.DepartmentRepository;
import com.project.groupware.repository.PositionRepository;
import com.project.groupware.repository.RoleRepository;
import com.project.groupware.repository.StateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommonService {

    private final DepartmentRepository departmentRepository;

    private final PositionRepository positionRepository;

    private final RoleRepository roleRepository;

    private final StateRepository stateRepository;

    public Optional<Department> getDepartment(Integer deptId) {
        return departmentRepository.findByDeptIdAndIsDeletedFalse(deptId);
    }

    public List<Department> getDepartments() {
        return departmentRepository.findAllByIsDeletedFalseOrderBySortOrderAsc();
    }

    public Optional<Position> getPosition(Integer posId) {
        return positionRepository.findByPosIdAndIsDeletedFalse(posId);
    }

    public List<Position> getPositions() {
        return positionRepository.findAllByIsDeletedFalseOrderBySortOrderAsc();
    }

    public Optional<Role> getRole(Integer roleId) {
        return roleRepository.findByRoleIdAndIsDeletedFalse(roleId);
    }

    public List<Role> getRoles() {
        return roleRepository.findAllByIsDeletedFalseOrderBySortOrderAsc();
    }

    public Optional<State> getState(Integer stateId) {
        return stateRepository.findByStateIdAndIsDeletedFalse(stateId);
    }

    public List<State> getStates(StateKeys key) {
        return stateRepository.findAllByIsDeletedFalseOrderBySortOrderAsc(key);
    }
}
