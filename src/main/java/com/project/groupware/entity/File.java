package com.project.groupware.entity;

import com.project.groupware.converters.BooleanConverter;
import com.project.groupware.converters.FileModuleTypeConverter;
import com.project.groupware.entity.auditing.BaseEntity;
import com.project.groupware.enums.FileModuleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "TBL_FILE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File extends BaseEntity {

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
    @Convert(converter = FileModuleTypeConverter.class)
    private FileModuleType moduleType;

    @NotNull
    private Long moduleId;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "FILE_DEL_YN")
    private Boolean isFileDeleted;

    @Builder
    public File(String originalName, String uploadName, String basename, String fileExt, Long fileSize, String filePath, String fileLoadPath, FileModuleType moduleType, Long moduleId, Boolean isDeleted, Boolean isFileDeleted) {
        this.originalName = originalName;
        this.uploadName = uploadName;
        this.basename = basename;
        this.fileExt = fileExt;
        this.fileSize = fileSize;
        this.filePath = filePath;
        this.fileLoadPath = fileLoadPath;
        this.moduleType = moduleType;
        this.moduleId = moduleId;
        this.isDeleted = isDeleted;
        this.isFileDeleted = isFileDeleted;
        this.isDeleted = false;
        this.isFileDeleted = false;
    }
}
