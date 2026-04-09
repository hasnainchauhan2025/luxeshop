import type { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setAdmin: (isAdmin: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,
      isAuthenticated: false,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.role === "admin",
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        }),

      setAdmin: (isAdmin) => set({ isAdmin }),
    }),
    { name: "auth-store" },
  ),
);
