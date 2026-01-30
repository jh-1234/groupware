package com.project.groupware.repository;

import com.project.groupware.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PositionRepository extends JpaRepository<Position, Integer> {

    Optional<Position> findByPosIdAndIsDeletedFalse(Integer posId);

    List<Position> findAllByIsDeletedFalseOrderBySortOrderAsc();
}
