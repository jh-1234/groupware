package com.project.groupware.repository;

import com.project.groupware.entity.PostLikeEmployeeMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeEmployeeMappingRepository extends JpaRepository<PostLikeEmployeeMapping, Long> {

    Optional<PostLikeEmployeeMapping> findByPost_PostIdAndEmployee_EmpId(Long postId, Long empId);

    Optional<PostLikeEmployeeMapping> findByComment_CommentIdAndEmployee_EmpId(Long commentId, Long empId);
}
