import { useAuthStore } from "@/stores/authStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect } from "react";

export function useAuth() {
  const {
    identity,
    login: iiLogin,
    clear,
    loginStatus,
  } = useInternetIdentity();
  const { user, isAuthenticated, isAdmin, login, logout } = useAuthStore();

  const isLoading = loginStatus === "logging-in";

  useEffect(() => {
    if (identity && (loginStatus === "success" || loginStatus === "idle")) {
      const principal = identity.getPrincipal().toString();
      if (!user || user.principal !== principal) {
        login({
          id: principal,
          principal,
          role: "user",
          createdAt: Date.now(),
        });
      }
    } else if (loginStatus === "idle" && !identity) {
      logout();
    }
  }, [identity, loginStatus, user, login, logout]);

  const handleLogin = async () => {
    await iiLogin();
  };

  const handleLogout = () => {
    clear();
    logout();
  };

  return {
    user,
    identity,
    isAuthenticated,
    isAdmin,
    isLoading,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
  };
}
