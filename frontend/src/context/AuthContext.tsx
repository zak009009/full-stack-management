import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("campus_user");
    const savedToken = localStorage.getItem(
      import.meta.env.VITE_AUTH_TOKEN_KEY
    );

    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        // Set default authorization header for all future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      } catch (e) {
        console.error("Error parsing saved user", e);
        localStorage.removeItem("campus_user");
        localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      const { token, user: userData } = response.data;

      // Save token and user data
      localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY, token);
      localStorage.setItem("campus_user", JSON.stringify(userData));

      // Set default authorization header for all future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("campus_user");
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        email,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
