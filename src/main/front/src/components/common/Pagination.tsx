import styled from "@emotion/styled";
import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type CustomPaginationProps = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const paginationStyle = {
  "& .MuiPagination-ul": {
    justifyContent: "center",
    gap: "4px",
  },
  "& .MuiPaginationItem-root": {
    width: "32px",
    height: "32px",
    minWidth: "32px",
    borderRadius: "4px",
    margin: 0,
    fontSize: "14px",
    fontWeight: 500,
    color: "#71717a",
    transition: "all 0.2s",
    border: "none",
    "&:hover": {
      backgroundColor: "#f4f4f5",
    },
  },

  "& .Mui-selected.MuiPaginationItem-root": {
    backgroundColor: "#2563eb !important",
    color: "#ffffff !important",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#1d4ed8 !important",
    },
  },

  "& .MuiPaginationItem-icon": {
    fontSize: "18px",
  },

  "& .MuiPaginationItem-ellipsis": {
    display: "inline-flex",
    alignItems: "center",
  },
};

const StyledPagination = styled.div`
  margin: 24px auto 0;
`;

export default function CustomPagination({
  count,
  page,
  onChange,
}: CustomPaginationProps) {
  return (
    <StyledPagination>
      <Pagination
        count={count}
        page={page + 1}
        onChange={onChange}
        sx={paginationStyle}
        showFirstButton={true}
        showLastButton={true}
        boundaryCount={0}
        siblingCount={4}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: KeyboardDoubleArrowLeftIcon,
              last: KeyboardDoubleArrowRightIcon,
              previous: NavigateBeforeIcon,
              next: NavigateNextIcon,
            }}
            {...item}
          />
        )}
      />
    </StyledPagination>
  );
}
