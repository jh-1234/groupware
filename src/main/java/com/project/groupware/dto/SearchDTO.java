package com.project.groupware.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchDTO {

    private Long empId;

    private Integer deptId;

    private Integer posId;

    private Integer roleId;

    private Integer stateId;

    private String searchWord;
}
