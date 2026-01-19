package com.project.groupware.entity;

import com.project.groupware.converters.BooleanConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_ROLE")
@Getter
@Setter
public class Role {

    @PrePersist
    public void prePersist() {
        this.isDeleted = false;
    }

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
}
