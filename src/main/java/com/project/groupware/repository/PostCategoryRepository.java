package com.project.groupware.repository;

import com.project.groupware.entity.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {

    Optional<PostCategory> findByCateIdAndIsDeletedFalse(Integer typeId);

    List<PostCategory> findAllByIsDeletedFalseOrderBySortOrderAsc();
}
