package com.project.groupware.entity;

import com.project.groupware.entity.auditing.TimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_POST_COMMENT")
@Getter
@Setter
public class PostComment extends TimeEntity {

    @PrePersist
    private void init() {
        this.likeCount = 0;
        this.isUpdated = false;
        this.isDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMP_ID", nullable = false)
    private Employee employee;

    @NotBlank
    private String content;

    @NotNull
    private Integer likeCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private PostComment parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TARGET_EMP_ID")
    private Employee target;

    @NotNull
    @Column(name = "UPDATE_YN")
    private Boolean isUpdated;

    @NotNull
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
