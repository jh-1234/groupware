package com.project.groupware.valid;

import com.project.groupware.constants.ValidationType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.util.StringUtils;

import java.nio.charset.Charset;

public class CustomValidator implements ConstraintValidator<CustomValidation, String> {

    private static final String REGEX_ALPHA = "^[A-Za-z]+$";
    private static final String REGEX_ALPHA_NUMERIC = "^[A-Za-z0-9]+$";
    private static final String REGEX_BASIC_TEXT = "^[A-Za-z가-힣!@#$%^&*()_+={}\\[\\]:;'\",./<>?~-]+$";
    private static final String REGEX_PASSWORD = "^[A-Za-z0-9!@#$&*]+$";
    private static final String REGEX_TEL = "^[0-9][0-9-]*[0-9]$";
    private static final String REGEX_EMAIL = "^[A-Za-z0-9._-]+@[A-Za-z0-9_-]+\\.[A-Za-z.]{2,8}$";

    private static final String CHARSET_EUC_KR = "euc-kr";

    private String name;

    private ValidationType validationType;

    private int min;

    private int max;

    private boolean nullable;

    private int byteMin;

    private int byteMax;

    private boolean isByteCheck;

    @Override
    public void initialize(CustomValidation constraintAnnotation) {
        this.name = constraintAnnotation.name();
        this.validationType = constraintAnnotation.checkType();
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
        this.nullable = constraintAnnotation.nullable();
        this.byteMin = this.min * 2;
        this.byteMax = this.max * 2;

        this.isByteCheck = switch (validationType) {
            case NONE, BASIC_TEXT -> true;
            default -> false;
        };
    }

    @Override
    public boolean isValid(String str, ConstraintValidatorContext context) {
        if (this.nullable && !StringUtils.hasText(str)) {
            return true;
        }

        if (!StringUtils.hasText(str)) {
            String message = "[" + name + "] " + "항목을 입력해주세요.";

            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message).addConstraintViolation();

            return false;
        }

        if (!validateLength(str, context)) {
            return false;
        }

        return validateByType(str, context);
    }

    private boolean validateByType(String str, ConstraintValidatorContext context) {
        return switch (validationType) {
            case ALPHA -> validateRegexp(str, context, REGEX_ALPHA, "영문만 가능합니다.");
            case ALPHA_NUMERIC -> validateRegexp(str, context, REGEX_ALPHA_NUMERIC, "영문, 숫자만 가능합니다.");
            case BASIC_TEXT -> validateRegexp(str, context, REGEX_BASIC_TEXT, "허용되지 않은 문자가 있습니다.");
            case PASSWORD -> validatePassword(str, context);
            case TEL -> validateTel(str, context);
            case EMAIL -> validateEmail(str, context);

            case NONE -> true;
        };
    }

    private boolean validateRegexp(String str, ConstraintValidatorContext context, String regex, String errorSuffix) {
        if (!str.matches(regex)) {
            String message = "[" + name + "] " + errorSuffix;

            return buildViolation(context, message);
        }

        return true;
    }

    private boolean validatePassword(String str, ConstraintValidatorContext context) {
        if (!str.matches(REGEX_PASSWORD)) {
            String message = "[" + name + "] " + "영문, 숫자, 특수문자(!, @, #, $, &, *)만 입력 가능합니다.";

            return buildViolation(context, message);
        }

        return true;
    }

    private boolean validateTel(String str, ConstraintValidatorContext context) {
        if (!str.matches(REGEX_TEL)) {
            String message = "[" + name + "] " + "시작과 끝은 반드시 숫자여야 하고, 숫자와 하이픈(-) 조합만 가능합니다.";

            return buildViolation(context, message);
        }

        return true;
    }

    private boolean validateEmail(String str, ConstraintValidatorContext context) {
        if (!str.matches(REGEX_EMAIL)) {
            String message = "[" + name + "] " + "올바른 이메일 형식이 아닙니다.";

            return buildViolation(context, message);
        }

        return true;
    }

    private String createLengthMessage() {
        StringBuilder message = new StringBuilder()
                .append("[")
                .append(name)
                .append("] ")
                .append("허용 길이는 ");

        if (min == 0) {
            if (isByteCheck) {
                message
                        .append("한글 ")
                        .append(max)
                        .append("자 이하, 영문 ")
                        .append(byteMax)
                        .append("자 이하입니다.");
            } else {
                message
                        .append(max)
                        .append("자 이하입니다.");
            }
        } else if (max == 0) {
            if (isByteCheck) {
                message
                        .append("한글 ")
                        .append(min)
                        .append("자 이상, ")
                        .append("영문 ")
                        .append(byteMin)
                        .append("자 이상입니다.");
            } else {
                message
                        .append(min)
                        .append("자 이상입니다.");
            }
        } else {
            if (isByteCheck) {
                message
                        .append("한글 ")
                        .append(min)
                        .append("~")
                        .append(max)
                        .append("자, ")
                        .append("영문 ")
                        .append(byteMin)
                        .append("~")
                        .append(byteMax)
                        .append("자 입니다.");
            } else {
                message
                        .append(min)
                        .append("~")
                        .append(max)
                        .append("자 입니다.");
            }
        }

        return message.toString();
    }

    private boolean validateLength(String str, ConstraintValidatorContext context) {
        int targetLength;
        int min, max;

        if (isByteCheck) {
            targetLength = getByteLength(str, CHARSET_EUC_KR);
            min = this.byteMin;
            max = this.byteMax;
        } else {
            targetLength = str.length();
            min = this.min;
            max = this.max;
        }

        if (targetLength < min || targetLength > max) {
            String message = createLengthMessage();

            return buildViolation(context, message);
        }

        return true;
    }

    private int getByteLength(String str, String charset) {
        return str.getBytes(Charset.forName(charset)).length;
    }

    private boolean buildViolation(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();

        return false;
    }
}
