package com.project.groupware.valid;

import com.project.groupware.enums.ValidationType;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CustomValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomValidation {

    String message() default "custom size validation failed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String name();

    ValidationType checkType() default ValidationType.NONE;

    int min() default 0;

    int max() default Integer.MAX_VALUE;

    boolean nullable() default true;
}
