 'use client';
 
 import { createContext, useContext, useEffect, useMemo, useState } from 'react';
 import { MOCK_USERS } from '@/app/lib/mockDb';
 
 type AuthUser = {
   phone: string;
   role: 'worker' | 'customer' | 'admin';
   name: string;
};
 
 type LoginResult =
   | { success: true; role: AuthUser['role'] }
   | { success: false; error: string };
 
 type AuthContextType = {
   user: AuthUser | null;
   login: (phone: string, otp: string) => Promise<LoginResult>;
   logout: () => void;
   loading: boolean;
 };
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<AuthUser | null>(null);
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {
     try {
       const saved = localStorage.getItem('authUser');
       if (saved) {
         setUser(JSON.parse(saved));
       }
     } catch {}
   }, []);
 
  const login = async (phone: string, otp: string): Promise<LoginResult> => {
     setLoading(true);
     await new Promise((r) => setTimeout(r, 300));
     setLoading(false);
     const found = MOCK_USERS.find((u) => u.phone === phone);
     if (!found) {
       return { success: false, error: 'Invalid credentials' };
     }
     if (otp !== '123456' && otp !== found.otp) {
       return { success: false, error: 'Invalid credentials' };
     }
    const safeUser: AuthUser = { phone: found.phone, role: found.role, name: found.name };
    setUser(safeUser);
    localStorage.setItem('authUser', JSON.stringify(safeUser));
     localStorage.setItem('isLoggedIn', 'true');
     localStorage.setItem('userRole', found.role);
     localStorage.setItem('currentUser', JSON.stringify({ role: found.role, name: found.name, phone: found.phone, email: '' }));
     return { success: true, role: found.role };
   };
 
   const logout = () => {
     setUser(null);
     localStorage.removeItem('authUser');
     localStorage.removeItem('isLoggedIn');
     localStorage.removeItem('userRole');
     localStorage.removeItem('currentUser');
   };
 
   const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);
 
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
 }
 
 export function useAuth() {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error('useAuth must be used within AuthProvider');
   return ctx;
 }
