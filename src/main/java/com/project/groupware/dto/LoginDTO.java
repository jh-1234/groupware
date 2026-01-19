package com.project.groupware.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.groupware.utils.CommonUtils;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginDTO {

    @Setter(AccessLevel.NONE)
    private String username;

    private String password;

    private Boolean isRememberMe;

    public void setUsername(String username) {
        this.username = CommonUtils.strip(username);
    }
}
