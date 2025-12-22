import { useEffect, useState } from "react";
import { getAuthMe } from "@/services/spring-apis/auth.service";
import type { AuthUserResponse } from "@/types";

export const useAuthUser = () => {
  const [user, setUser] = useState<AuthUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await getAuthMe();
        setUser(data);
      } catch (err) {
        setUser(null);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return {
    user,
    roles: user?.roles ?? [],
    loading,
    error,
    isAuthenticated: !!user,
  };
};