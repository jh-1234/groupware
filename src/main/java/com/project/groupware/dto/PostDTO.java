package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.groupware.utils.CommonUtils;
import com.project.groupware.valid.CustomValidation;
import com.project.groupware.valid.groups.common.Save;
import com.project.groupware.valid.groups.common.Update;
import com.project.groupware.valid.groups.post.Like;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDTO {

    @NotNull(groups = Update.class)
    private Long postId;

    @NotNull(groups = {Save.class, Update.class})
    private Integer cateId;

    private String cateName;

    private Long authorId;

    private String authorName;

    private String deptName;

    private String posName;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "제목", max = 50, nullable = false, groups = {Save.class, Update.class})
    private String title;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "내용", max = 3000, nullable = false, groups = {Save.class, Update.class})
    private String content;

    private Integer likeCount;

    private Integer viewCount;

    private Boolean isUpdated;

    private String profileUrl;

    private String createdDateFormat;

    @NotNull(groups = {Like.class})
    private Boolean isLiked;

    private Long commentId;

    private List<PostCommentDTO> comments;

    private List<FileDTO> files;

    private Set<Long> deleteFileIds;

    public void setTitle(String title) {
        this.title = CommonUtils.strip(title);
    }

    public void setContent(String content) {
        this.content = CommonUtils.strip(content);
    }
}
