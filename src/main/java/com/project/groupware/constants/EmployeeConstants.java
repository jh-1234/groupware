package com.project.groupware.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

public class EmployeeConstants {

    @Getter
    @AllArgsConstructor
    public enum State {
        EMPLOYED(1, "재직"),
        RESIGNED(2, "퇴사");

        private final Integer value;

        private final String description;
    }

    @Getter
    @AllArgsConstructor
    public enum Gender {
        MALE("M", "남성"),
        FEMALE("F", "여성");

        private final String type;

        private final String description;

        public static Gender getGender(String type) {
            return Arrays.stream(Gender.values()).filter(g -> g.getType().equals(type)).findFirst().orElseThrow();
        }
    }
}
