package com.project.groupware.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class PostConstants {

    @Getter
    @AllArgsConstructor
    public enum Category {
        ALL(1);

        private final Integer value;
    }
}
