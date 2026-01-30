package com.project.groupware.service;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.dto.DepartmentDTO;
import com.project.groupware.dto.PositionDTO;
import com.project.groupware.dto.RoleDTO;
import com.project.groupware.dto.StateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

    private final CommonService commonService;

    public List<DepartmentDTO> getDepartments() {
        return commonService.getDepartments().stream().map(department -> new DepartmentDTO(department.getDeptId(), department.getDeptName(), department.getDeptAuthValue())).toList();
    }

    public List<PositionDTO> getPositions() {
        return commonService.getPositions().stream().map(position -> new PositionDTO(position.getPosId(), position.getPosName(), position.getPosAuthValue())).toList();
    }

    public List<RoleDTO> getRoles() {
        return commonService.getRoles().stream().map(role -> new RoleDTO(role.getRoleId(), role.getRoleName(), role.getRoleAuthValue())).toList();
    }

    public List<StateDTO> getStates(StateKeys key) {
        return commonService.getStates(key).stream().map(state -> new StateDTO(state.getStateId(), state.getStateName())).toList();
    }
}
