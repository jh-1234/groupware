package com.project.groupware.converters;

import com.project.groupware.constants.FileConstants;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Objects;

@Converter
public class FileModuleTypeConverter implements AttributeConverter<FileConstants.Module, String> {

    /**
     * FileModuleType의 값을 char(1)인 value로 변환
     */
    @Override
    public String convertToDatabaseColumn(FileConstants.Module type) {
        return Objects.nonNull(type) ? type.getValue() : null;
    }

    /**
     * DB에서 가져온 char(1) 인 값을 FileModuleType으로 변환
     */
    @Override
    public FileConstants.Module convertToEntityAttribute(String string) {
        return Objects.nonNull(string) ? Arrays.stream(FileConstants.Module.values())
                .filter(v -> v.getValue().equals(string)).findFirst().orElseThrow(IllegalArgumentException::new) : null;
    }
}
