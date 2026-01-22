package com.project.groupware.repository;

import com.project.groupware.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    Optional<PostComment> findByCommentIdAndIsDeletedFalse(Long commentId);

    @Modifying
    @Query("update PostComment pc set pc.likeCount = pc.likeCount + 1 where pc.commentId = :commentId and pc.isDeleted = false")
    void incrementLikeCount(@Param("commentId") Long commentId);

    @Modifying
    @Query("update PostComment pc set pc.likeCount = pc.likeCount - 1 where pc.commentId = :commentId and pc.isDeleted = false")
    void decrementLikeCount(@Param("commentId") Long commentId);
}
