import { create } from "zustand";
import { combine } from "zustand/middleware";

type State = {
  isOpen: boolean;
  title?: string;
  description?: string;
  onPositive?: () => void;
  onNegative?: () => void;
};

const init: State = {
  isOpen: false,
};

const useConfirmModalStore = create(
  combine(init, (set) => ({
    actions: {
      open: (params: Omit<State, "isOpen">) => {
        set({ ...params, isOpen: true });
      },
      close: () => {
        set({ isOpen: false });
      },
    },
  })),
);

export const useOpenConfirmModal = () => {
  const open = useConfirmModalStore((store) => store.actions.open);

  return open;
};

export const useConfirmModal = () => {
  const store = useConfirmModalStore();

  return store;
};
