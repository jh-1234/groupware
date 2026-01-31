package com.project.groupware.converters;

import com.project.groupware.constants.EmployeeConstants;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Objects;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<EmployeeConstants.Gender, String> {

    @Override
    public String convertToDatabaseColumn(EmployeeConstants.Gender gender) {
        return Objects.nonNull(gender) ? gender.getType() : null;
    }

    @Override
    public EmployeeConstants.Gender convertToEntityAttribute(String string) {
        return Objects.nonNull(string) ? Arrays.stream(EmployeeConstants.Gender.values())
                .filter(g -> g.getType().equals(string)).findFirst().orElseThrow() : null;
    }
}
