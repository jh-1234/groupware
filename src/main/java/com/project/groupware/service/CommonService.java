package com.project.groupware.service;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.dto.DepartmentDTO;
import com.project.groupware.dto.PositionDTO;
import com.project.groupware.dto.RoleDTO;
import com.project.groupware.dto.StateDTO;
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

    public Optional<Department> findByDepartment(Integer deptId) {
        return departmentRepository.findByDeptIdAndIsDeletedFalse(deptId);
    }

    public List<Department> findAllByDepartment() {
        return departmentRepository.findAllByIsDeletedFalseOrderBySortOrderAsc();
    }

    public Optional<Position> findByPosition(Integer posId) {
        return positionRepository.findByPosIdAndIsDeletedFalse(posId);
    }

    public List<Position> findAllByPosition() {
        return positionRepository.findAllByIsDeletedFalseOrderBySortOrderAsc();
    }

    public Optional<Role> findByRole(Integer roleId) {
        return roleRepository.findByRoleIdAndIsDeletedFalse(roleId);
    }

    public List<Role> findAllByRole() {
        return roleRepository.findAllByIsDeletedFalseOrderBySortOrderAsc();
    }

    public Optional<State> findByState(Integer stateId) {
        return stateRepository.findByStateIdAndIsDeletedFalse(stateId);
    }

    public List<State> findAllByState(StateKeys key) {
        return stateRepository.findAllByIsDeletedFalseOrderBySortOrderAsc(key);
    }

    public List<DepartmentDTO> getDepartments() {
        return findAllByDepartment().stream().map(department -> new DepartmentDTO(department.getDeptId(), department.getDeptName(), department.getDeptAuthValue())).toList();
    }

    public List<PositionDTO> getPositions() {
        return findAllByPosition().stream().map(position -> new PositionDTO(position.getPosId(), position.getPosName(), position.getPosAuthValue())).toList();
    }

    public List<RoleDTO> getRoles() {
        return findAllByRole().stream().map(role -> new RoleDTO(role.getRoleId(), role.getRoleName(), role.getRoleAuthValue())).toList();
    }

    public List<StateDTO> getStates(StateKeys key) {
        return findAllByState(key).stream().map(state -> new StateDTO(state.getStateId(), state.getStateName())).toList();
    }
}
