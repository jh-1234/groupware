package com.project.groupware.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.*;

@Aspect
@Component
public class AopAspect {

    /**
     * service 메소드 호출 시 파라미터가 전부 null 이라면 메소드 실행 안함
     */
    @Around("execution(* com.project.groupware.service..*(..))")
    public Object paramNullCheck(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        if (args.length == 0) {
            return joinPoint.proceed();
        }

        Class<?> returnType = ((MethodSignature) joinPoint.getSignature()).getReturnType();
        boolean isValid = Arrays.stream(args).anyMatch(Objects::nonNull);

        return isValid ? joinPoint.proceed() : getEmptyInstance(returnType);
    }

    private Object getEmptyInstance(Class<?> returnType) {
        return switch (returnType) {
            case Class<?> type when List.class.isAssignableFrom(type) -> List.of();
            case Class<?> type when Set.class.isAssignableFrom(type) -> Set.of();
            case Class<?> type when Map.class.isAssignableFrom(type) -> Map.of();
            case Class<?> type when Optional.class.isAssignableFrom(type) -> Optional.empty();
            default -> null;
        };
    }
}
