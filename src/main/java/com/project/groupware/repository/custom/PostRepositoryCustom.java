package com.project.groupware.repository.custom;

import com.project.groupware.dto.PostCommentDTO;
import com.project.groupware.dto.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {

    PostDTO getPost(Long postId);

    Page<PostDTO> getPosts(Integer cateId, Pageable pageable);

    List<PostCommentDTO> getComments(Long postId);
}
