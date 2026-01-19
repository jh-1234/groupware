package com.project.groupware.repository.impl;

import com.project.groupware.constants.MemberConstants;
import com.project.groupware.entity.Employee;
import com.project.groupware.repository.custom.EmployeeRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static com.project.groupware.entity.QEmployee.employee;

@Component
@RequiredArgsConstructor
public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Employee> login(String username) {
        return Optional.ofNullable(queryFactory
                .selectFrom(employee)
                .where(
                        employee.username.eq(username),
                        employee.state.stateId.eq(MemberConstants.State.EMPLOYED.getValue()),
                        employee.isLocked.eq(false),
                        employee.isDeleted.eq(false)
                )
                .fetchOne());
    }
}
