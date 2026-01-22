package com.project.groupware.repository.mapper;

import com.project.groupware.dto.PostCommentDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

    List<PostCommentDTO> getComments(PostCommentDTO dto);
}
