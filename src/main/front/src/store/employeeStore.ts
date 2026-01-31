import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useEmployeeStore = create(
  combine(
    {
      page: 0,
      searchWord: "",
      filters: {
        deptId: null as number | null,
        posId: null as number | null,
        roleId: null as number | null,
        stateId: null as number | null,
      },
    },
    (set) => ({
      setPage: (page: number) => set({ page }),

      setSearchWord: (word: string) => set({ searchWord: word, page: 0 }),

      setFilter: (key: string, value: string) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value === "" ? null : Number(value),
          },
          page: 0,
        })),

      resetAll: () =>
        set({
          page: 0,
          searchWord: "",
          filters: { deptId: null, posId: null, roleId: null, stateId: null },
        }),
    }),
  ),
);
