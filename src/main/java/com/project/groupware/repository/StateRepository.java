package com.project.groupware.repository;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StateRepository extends JpaRepository<State, Integer> {

    Optional<State> findByStateIdAndIsDeletedFalse(Integer stateId);

    List<State> findAllByIsDeletedFalseOrderBySortOrderAsc(StateKeys key);
}
