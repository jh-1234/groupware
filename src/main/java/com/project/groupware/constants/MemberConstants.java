package com.project.groupware.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberConstants {

    @Getter
    @AllArgsConstructor
    public enum State {
        EMPLOYED(1, "재직"),
        RESIGNED(2, "퇴사");

        private final Integer value;

        private final String description;
    }
}
