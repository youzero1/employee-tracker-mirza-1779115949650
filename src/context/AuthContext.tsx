import { createContext, useState, ReactNode } from 'react';
import { User, Role } from '@/types';
import { USERS } from '@/lib/seed';
import { getItem, setItem, removeItem } from '@/lib/storage';

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => false,
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return getItem<User | null>('hr_current_user', null);
  });

  const login = (email: string, _password: string): boolean => {
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setItem('hr_current_user', user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    removeItem('hr_current_user');
  };

  const switchRole = (role: Role) => {
    const user = USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setItem('hr_current_user', user);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}
