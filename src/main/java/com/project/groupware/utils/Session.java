package com.project.groupware.utils;

import com.project.groupware.dto.SessionDTO;
import com.project.groupware.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;

public final class Session {

    private Session() {
    }

    public static SessionDTO getSession() {
        CustomUserDetails principal = (CustomUserDetails) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();

        return Objects.requireNonNull(principal).session();
    }
}
