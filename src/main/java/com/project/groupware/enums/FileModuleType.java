package com.project.groupware.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FileModuleType {
    POST("P", "post"),
    PROFILE("PF", "profile");

    private final String value;

    private final String path;
}
