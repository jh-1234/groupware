package com.project.groupware.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Set;

public class FileConstants {

    @Getter
    @AllArgsConstructor
    public enum File {

        IMAGE("I", Set.of("image/jpeg", "image/png", "image/gif"), Set.of(".jpg", ".jpeg", ".png", ".gif")),
        VIDEO("V", Set.of("video/mp4"), Set.of(".mp4")),
        GENERAL("G", Set.of("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), Set.of(".xlsx"));

        private final String type;

        private final Set<String> mimeTypes;

        private final Set<String> extensions;

        /**
         * 보안을 위해 mimeType과 extension 둘 다 조건에 맞아야 FileType 리턴
         */
        public static File getFileType(String mimeType, String extension) {
            return Arrays.stream(values())
                    .filter(file -> file.mimeTypes.contains(mimeType) && file.extensions.contains(extension))
                    .findFirst()
                    .orElseThrow(IllegalArgumentException::new);
        }
    }

    @Getter
    @AllArgsConstructor
    public enum Module {

        POST("P", "post"),
        POST_COMMENT("PC", "post"),
        PROFILE("PF", "profile");

        private final String value;

        private final String path;
    }
}
