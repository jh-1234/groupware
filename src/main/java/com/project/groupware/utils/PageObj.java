package com.project.groupware.utils;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageObj<T> {

    public PageObj(Page<T> page) {
        this.content = page.getContent();
        this.total = page.getTotalElements();
        this.offset = page.getPageable().getOffset();
        this.totalPage = page.getTotalPages();
        this.isFirst = page.isFirst();
        this.isLast = page.isLast();
        this.number = page.getNumber();
    }

    private final List<T> content;

    private final Long total;

    private final Long offset;

    private final Integer totalPage;

    private final Boolean isFirst;

    private final Boolean isLast;

    private final Integer number;
}
