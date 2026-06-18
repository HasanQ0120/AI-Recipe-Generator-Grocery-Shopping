import { createContext, useContext, useState } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

type AuthContextType = {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/login?email=${email}&password=${password}`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setUser({ name: '', email });
        setIsLoggedIn(true);
      }
    } catch (e) {
      setError('Could not connect to server');
    }
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/signup?email=${email}&password=${password}&name=${name}`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setUser({ name, email });
        setIsLoggedIn(true);
      }
    } catch (e) {
      setError('Could not connect to server');
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}