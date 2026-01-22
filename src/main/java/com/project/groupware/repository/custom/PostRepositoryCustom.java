package com.project.groupware.repository.custom;

import com.project.groupware.dto.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

    PostDTO getPost(Long postId);

    Page<PostDTO> getPosts(Integer cateId, Pageable pageable);
}
