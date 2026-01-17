import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface Session {
  empId: number;
  name: string;
  profileUrl: string;
}

const init: {
  accessToken: string | null;
  isLogin: boolean;
  session: Session | null;
} = { accessToken: null, isLogin: false, session: null };

const useAuthStore = create(
  persist(
    combine(init, (set) => ({
      actions: {
        setToken: (token: string) => {
          try {
            const data = jwtDecode<Session>(token);

            set({
              accessToken: token,
              isLogin: true,
              session: {
                empId: data.empId,
                name: data.name,
                profileUrl: data.profileUrl,
              },
            });
          } catch (e) {
            set({ accessToken: null, isLogin: false, session: null });
          }
        },
        clearToken: () =>
          set({ accessToken: null, isLogin: false, session: null }),
      },
    })),
    {
      name: "isLogin",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isLogin: state.isLogin }),
    },
  ),
);

export const useAuthActions = () => {
  const actions = useAuthStore((store) => store.actions);

  return actions;
};

export const useIsLogin = () => {
  const isLogin = useAuthStore((store) => store.isLogin);

  return isLogin;
};

export const useSession = () => {
  const session = useAuthStore((store) => store.session);

  return session;
};

export const getAccessToken = () => {
  const token = useAuthStore.getState().accessToken;

  return token;
};

export const getAuthActions = () => {
  const actions = useAuthStore.getState().actions;

  return actions;
};
