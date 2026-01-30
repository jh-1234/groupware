package com.project.groupware.repository.impl;

import com.project.groupware.constants.MemberConstants;
import com.project.groupware.dto.EmployeeDTO;
import com.project.groupware.dto.SearchDTO;
import com.project.groupware.entity.Employee;
import com.project.groupware.repository.custom.EmployeeRepositoryCustom;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.project.groupware.entity.QDepartment.department;
import static com.project.groupware.entity.QEmployee.employee;
import static com.project.groupware.entity.QFile.file;
import static com.project.groupware.entity.QPosition.position;
import static com.project.groupware.entity.QRole.role;
import static com.project.groupware.entity.QState.state;

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

    @Override
    public Page<EmployeeDTO> getAdminEmployees(SearchDTO dto, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(employee.isDeleted.eq(false));

        if (Objects.nonNull(dto.getDeptId())) {
            builder.and(department.deptId.eq(dto.getDeptId()));
        }

        if (Objects.nonNull(dto.getPosId())) {
            builder.and(position.posId.eq(dto.getPosId()));
        }

        if (Objects.nonNull(dto.getRoleId())) {
            builder.and(role.roleId.eq(dto.getRoleId()));
        }

        if (Objects.nonNull(dto.getStateId())) {
            builder.and(state.stateId.eq(dto.getStateId()));
        }

        if (StringUtils.hasText(dto.getSearchWord())) {
            builder.and(
                    employee.empName.contains(dto.getSearchWord())
                            .or(employee.tel.contains(dto.getSearchWord()))
                            .or(employee.telClean.contains(dto.getSearchWord()))
            );
        }

        List<EmployeeDTO> employees = queryFactory
                .select(Projections.bean(EmployeeDTO.class,
                        Expressions.numberTemplate(Long.class, "ROW_NUMBER() OVER(ORDER BY {0})", employee.empId).as("no"),
                        employee.empId,
                        employee.username,
                        employee.empName,
                        department.deptId,
                        department.deptName,
                        position.posId,
                        position.posName,
                        role.roleId,
                        role.roleName,
                        state.stateId,
                        state.stateName,
                        employee.email,
                        employee.tel,
                        employee.birthday,
                        file.fileLoadPath.as("profileUrl"),
                        employee.hireDate,
                        employee.resignDate,
                        employee.isLocked
                ))
                .from(employee)
                .join(employee.department, department)
                .join(employee.position, position)
                .join(employee.role, role)
                .join(employee.state, state)
                .leftJoin(employee.profile, file)
                .where(builder)
                .orderBy(employee.empId.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(employee.count())
                .from(employee)
                .where(builder);

        return PageableExecutionUtils.getPage(employees, pageable, countQuery::fetchOne);
    }
}
