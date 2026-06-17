import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const login = (email: string) => {
    setUser({ name: '', email });
    setIsLoggedIn(true);
  };

  const signup = (name: string, email: string) => {
    setUser({ name, email });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}