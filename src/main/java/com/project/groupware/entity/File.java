package com.project.groupware.entity;

import com.project.groupware.constants.FileConstants;
import com.project.groupware.entity.auditing.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_FILE")
@Getter
@Setter
public class File extends BaseEntity {

    @PrePersist
    public void prePersist() {
        this.isDeleted = false;
        this.isFileDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long fileId;

    @NotBlank
    private String originalName;

    @NotBlank
    private String uploadName;

    @NotBlank
    private String basename;

    @NotBlank
    private String fileExt;

    @NotNull
    private Long fileSize;

    @NotBlank
    private String filePath;

    @NotBlank
    private String fileLoadPath;

    @NotNull
    private FileConstants.Module moduleType;

    @NotNull
    private Long moduleId;

    @NotNull
    @Column(name = "DEL_YN")
    private Boolean isDeleted;

    @NotNull
    @Column(name = "FILE_DEL_YN")
    private Boolean isFileDeleted;
}
