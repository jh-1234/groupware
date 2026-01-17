package com.project.groupware.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Set;

@Getter
@AllArgsConstructor
public enum FileType {

    IMAGE("I", Set.of("image/jpeg", "image/png", "image/gif"), Set.of(".jpg", ".jpeg", ".png", ".gif")),
    VIDEO("V", Set.of("video/mp4"), Set.of(".mp4")),
    GENERAL("G", Set.of("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), Set.of(".xlsx"));

    private final String type;

    private final Set<String> mimeTypes;

    private final Set<String> extensions;

    /**
     * 보안을 위해 mimeType과 extension 둘 다 조건에 맞아야 FileType 리턴
     */
    public static FileType getFileType(String mimeType, String extension) {
        return Arrays.stream(values())
                .filter(fileType -> fileType.mimeTypes.contains(mimeType) && fileType.extensions.contains(extension))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
