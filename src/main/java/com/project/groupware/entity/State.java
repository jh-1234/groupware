package com.project.groupware.entity;

import com.project.groupware.constants.StateKeys;
import com.project.groupware.converters.BooleanConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TBL_STATE")
@Getter
@Setter
public class State {

    @PrePersist
    public void prePersist() {
        this.isDeleted = false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stateId;

    @Enumerated(EnumType.STRING)
    private StateKeys stateKey;

    @NotBlank
    private String stateName;

    @NotNull
    private Integer sortOrder;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name = "DEL_YN")
    private Boolean isDeleted;
}
