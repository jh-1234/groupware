package com.project.groupware.entity;

import com.project.groupware.converters.BooleanConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_POSITION")
@Getter
@Setter
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer posId;

    @NotBlank
    private String posName;

    @NotNull
    private Long posAuthValue;

    @NotNull
    private Integer sortOrder;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
