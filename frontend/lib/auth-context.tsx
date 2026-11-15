'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { type UserProfile } from './data';

interface AuthState {
  user: UserProfile | null;
  role: string | null;
  loading: boolean;
  login: (email?: string, role?: 'owner' | 'admin' | 'customer') => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AUTH_STORAGE_KEY = 'dapoerdjawa_user';

const AuthContext = createContext<AuthState>({
  user: null,
  role: null,
  loading: false,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Auto-purge stale dummy account from browser storage
        if (
          !parsed?.email ||
          parsed.email === 'owner@dapoerdjawa.com' ||
          parsed.nama_user?.toLowerCase().includes('budi') ||
          parsed.id === 'usr-001' ||
          parsed.id === 'usr-demo-01'
        ) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } else {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setUser(parsed);
        }
      }
    } catch {
      // ignore in SSR
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email = 'pelanggan@dapoerdjawa.com', role: 'owner' | 'admin' | 'customer' = 'customer') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      role,
      nama_user: email.split('@')[0],
      phone: '',
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        loading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
