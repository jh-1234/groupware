package com.project.groupware.repository;

import com.project.groupware.entity.Post;
import com.project.groupware.repository.custom.PostRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {

    Optional<Post> findByPostIdAndIsDeletedIsFalse(Long postId);

    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount + 1 where p.postId = :postId and p.isDeleted = false")
    void incrementLikeCount(@Param("postId") Long postId);

    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount - 1 where p.postId = :postId and p.isDeleted = false")
    void decrementLikeCount(@Param("postId") Long postId);
}
