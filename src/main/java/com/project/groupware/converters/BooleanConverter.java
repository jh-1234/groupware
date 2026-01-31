package com.project.groupware.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Objects;

@Converter(autoApply = true)
public class BooleanConverter implements AttributeConverter<Boolean, String> {

    /**
     * Boolean 값을 DB에 저장할 때 String(Y/N)으로 변환
     */
    @Override
    public String convertToDatabaseColumn(Boolean bool) {
        return Objects.nonNull(bool) && bool ? "Y" : "N";
    }

    /**
     * DB에서 가져온 String(Y/N) 값을 Boolean으로 변환
     */
    @Override
    public Boolean convertToEntityAttribute(String string) {
        return "Y".equalsIgnoreCase(string);
    }
}
