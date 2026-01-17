package com.project.groupware.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberState {

    EMPLOYED(1, "재직"),
    RESIGNED(2, "퇴사");

    private final Integer value;

    private final String description;
}
