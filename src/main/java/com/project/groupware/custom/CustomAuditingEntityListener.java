package com.project.groupware.custom;

import com.project.groupware.custom.auditing.CreatedById;
import com.project.groupware.dto.SessionDTO;
import com.project.groupware.utils.Session;
import jakarta.persistence.PrePersist;

import java.lang.reflect.Field;
import java.util.Objects;

public class CustomAuditingEntityListener {

    @PrePersist
    public void prePersist(Object entity) throws IllegalAccessException {
        Class<?> clazz = entity.getClass();
        SessionDTO session = Session.getSession();

        while (Objects.nonNull(clazz)) {
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(CreatedById.class)) {
                    field.setAccessible(true);
                    field.set(entity, session.empId());
                }
            }

            clazz = clazz.getSuperclass();
        }
    }
}
