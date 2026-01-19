package com.project.groupware.properties;

import com.project.groupware.constants.FileConstants;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.Map;

@Validated
@ConfigurationProperties(prefix = "storage")
public record StorageProperties(@NotEmpty Map<FileConstants.File, @Valid PathInfo> paths) {
    public record PathInfo(@NotBlank String uploadPath, @NotBlank String loadPath) {
    }
}
