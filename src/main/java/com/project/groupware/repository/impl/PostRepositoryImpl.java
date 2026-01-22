package com.project.groupware.repository.impl;

import com.project.groupware.constants.PostConstants;
import com.project.groupware.dto.PostDTO;
import com.project.groupware.repository.custom.PostRepositoryCustom;
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

import java.util.List;

import static com.project.groupware.entity.QDepartment.department;
import static com.project.groupware.entity.QEmployee.employee;
import static com.project.groupware.entity.QFile.file;
import static com.project.groupware.entity.QPosition.position;
import static com.project.groupware.entity.QPost.post;
import static com.project.groupware.entity.QPostCategory.postCategory;
import static com.project.groupware.entity.QPostLikeEmployeeMapping.postLikeEmployeeMapping;


@Component
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public PostDTO getPost(Long postId) {
        return queryFactory
                .select(Projections.bean(PostDTO.class,
                        post.postId,
                        post.category.cateId,
                        post.category.cateName,
                        employee.empId.as("authorId"),
                        employee.empName.as("authorName"),
                        department.deptName.as("deptName"),
                        position.posName.as("posName"),
                        post.title,
                        post.content,
                        post.likeCount,
                        post.viewCount,
                        post.isUpdated,
                        file.fileLoadPath.as("profileUrl"),
                        Expressions.stringTemplate("DATE_FORMAT({0}, {1})", post.createdDate, "%y-%m-%d %H:%i:%s").as("createdDateFormat"),
                        postLikeEmployeeMapping.id.isNotNull().as("isLiked")
                ))
                .from(post)
                .join(post.category, postCategory)
                .join(post.author, employee)
                .join(employee.department, department)
                .join(employee.position, position)
                .leftJoin(employee.profile, file)
                .leftJoin(postLikeEmployeeMapping).on(postLikeEmployeeMapping.post.eq(post))
                .where(
                        post.postId.eq(postId),
                        post.isDeleted.eq(false)
                )
                .fetchOne();
    }

    @Override
    public Page<PostDTO> getPosts(Integer cateId, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(post.isDeleted.eq(false));

        if (!PostConstants.Category.ALL.getValue().equals(cateId)) {
            builder.and(post.category.cateId.eq(cateId));
        }

        List<PostDTO> posts = queryFactory
                .select(Projections.bean(PostDTO.class,
                        post.postId,
                        post.category.cateId,
                        post.category.cateName,
                        employee.empId.as("authorId"),
                        employee.empName.as("authorName"),
                        position.posName.as("posName"),
                        post.title,
                        post.content,
                        post.likeCount,
                        post.viewCount,
                        post.isUpdated,
                        Expressions.stringTemplate("DATE_FORMAT({0}, {1})", post.createdDate, "%y-%m-%d %H:%i").as("createdDateFormat")
                ))
                .from(post)
                .join(post.author, employee)
                .join(employee.position, position)
                .where(builder)
                .orderBy(post.postId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(post.count())
                .from(post)
                .where(builder);

        return PageableExecutionUtils.getPage(posts, pageable, countQuery::fetchOne);
    }
}
