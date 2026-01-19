package com.project.groupware.repository;

import com.project.groupware.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    Optional<PostComment> findByCommentIdAndIsDeletedFalse(Long commentId);
}
