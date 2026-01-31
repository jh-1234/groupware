package com.project.groupware.entity;

import com.project.groupware.entity.auditing.TimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_POST")
@Getter
@Setter
public class Post extends TimeEntity {

    @PrePersist
    public void prePersist() {
        this.likeCount = 0;
        this.viewCount = 0;
        this.isUpdated = false;
        this.isDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_TYPE", nullable = false)
    private PostCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private Employee author;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    private Integer likeCount;

    @NotNull
    private Integer viewCount;

    @NotNull
    @Column(name = "UPDATE_YN")
    private Boolean isUpdated;

    @NotNull
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
