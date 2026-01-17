package com.project.groupware.entity;

import com.project.groupware.converters.BooleanConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TBL_ROLE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @NotBlank
    private String roleName;

    @NotNull
    private Long roleAuthValue;

    @NotNull
    private Integer sortOrder;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;

    @Builder
    public Role(String roleName, Long roleAuthValue, Integer sortOrder) {
        this.roleName = roleName;
        this.roleAuthValue = roleAuthValue;
        this.sortOrder = sortOrder;
        this.isDeleted = false;
    }
}
