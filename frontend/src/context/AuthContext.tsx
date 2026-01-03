// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>; // Remove password
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("presetflow_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Validate token/expiry here in production
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("presetflow_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // In production, this would be an API call
      const mockUser = {
        id: "1",
        email,
        name: email.split("@")[0],
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(mockUser);
      localStorage.setItem("presetflow_user", JSON.stringify(mockUser));
      localStorage.setItem("presetflow_token", "mock-jwt-token");
    } catch (error) {
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string) => {
    setIsLoading(true);
    try {
      // In production, this would be an API call
      const mockUser = {
        id: "1",
        email,
        name,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(mockUser);
      localStorage.setItem("presetflow_user", JSON.stringify(mockUser));
      localStorage.setItem("presetflow_token", "mock-jwt-token");
    } catch (error) {
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("presetflow_user");
    localStorage.removeItem("presetflow_token");
    localStorage.removeItem("preset-cart");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
