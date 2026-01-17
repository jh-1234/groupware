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
@Table(name = "TBL_POSITION")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Builder
    public Position(String posName, Long posAuthValue, Integer sortOrder) {
        this.posName = posName;
        this.posAuthValue = posAuthValue;
        this.sortOrder = sortOrder;
        this.isDeleted = false;
    }
}
