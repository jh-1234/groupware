package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.groupware.utils.CommonUtils;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginDTO {

    private String username;

    private String password;

    private Boolean isRememberMe;

    @Builder(toBuilder = true)
    public LoginDTO(String username, String password, Boolean isRememberMe) {
        this.username = CommonUtils.strip(username);
        this.password = password;
        this.isRememberMe = isRememberMe;
    }
}
