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
@Table(name = "TBL_STATE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stateId;

    @NotBlank
    private String stateKey;

    @NotBlank
    private String stateName;

    @NotNull
    private Integer sortOrder;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;

    @Builder
    public State(String stateKey, String stateName, Integer sortOrder) {
        this.stateKey = stateKey;
        this.stateName = stateName;
        this.sortOrder = sortOrder;
        this.isDeleted = false;
    }
}
