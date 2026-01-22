package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.groupware.utils.CommonUtils;
import com.project.groupware.valid.CustomValidation;
import com.project.groupware.valid.groups.common.Save;
import com.project.groupware.valid.groups.common.Update;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostCommentDTO {

    @NotNull(groups = {Update.class})
    private Long commentId;

    private Long parentId;

    private Long rootId;

    @NotNull(groups = Save.class)
    private Long postId;

    private Long empId;

    private String empName;

    private Long targetEmpId;

    private String targetEmpName;

    private String posName;

    private String createdDateFormat;

    private Integer likeCount;

    private String profileUrl;

    @Setter(AccessLevel.NONE)
    @CustomValidation(name = "내용", max = 600, nullable = false, groups = {Save.class, Update.class})
    private String content;

    private String targetName;

    private List<FileDTO> files;

    private Set<Long> deleteFileIds;

    private List<PostCommentDTO> replies;

    public void setContent(String content) {
        this.content = CommonUtils.strip(content);
    }
}
