 'use client';
 
 import { createContext, useContext, useEffect, useMemo, useState } from 'react';
 import { serviceProviders as seedProviders } from '../../data.js';
 
 export type ProviderItem = {
   id: number;
   name: string;
   location: string;
   service: string;
   rating?: number;
   reviews?: number;
   price?: number;
   phone: string;
   description?: string;
   image: string;
   goalTitle?: string;
   goalAmount?: number;
   currentGoal?: number;
   responseMinutes?: number;
   reviewsList?: Array<{ name: string; rating: number; comment: string; date?: string }>;
   verified?: boolean;
 };
 
 type ProvidersContextValue = {
   providers: ProviderItem[];
   addProvider: (p: Omit<ProviderItem, 'id'>) => void;
   deleteProvider: (id: number) => void;
   updateProvider: (id: number, data: Partial<ProviderItem>) => void;
   toggleVerification: (id: number) => void;
   stats: {
     total: number;
     verifiedCount: number;
     pendingCount: number;
   };
 };
 
 const ProvidersContext = createContext<ProvidersContextValue | null>(null);
 
 const STORAGE_KEY = 'providersData';
 
 export function ProvidersProvider({ children }: { children: React.ReactNode }) {
   const [providers, setProviders] = useState<ProviderItem[]>(() =>
     seedProviders.map((p: any) => ({ verified: false, ...p }))
   );
 
   useEffect(() => {
     try {
       const raw = localStorage.getItem(STORAGE_KEY);
       if (raw) {
         const parsed = JSON.parse(raw);
         if (Array.isArray(parsed)) {
           setProviders(parsed);
         }
       }
     } catch {}
   }, []);
 
   useEffect(() => {
     try {
       localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
     } catch {}
   }, [providers]);
 
   useEffect(() => {
     const onStorage = (e: StorageEvent) => {
       if (e.key === STORAGE_KEY && e.newValue) {
         try {
           const parsed = JSON.parse(e.newValue);
           if (Array.isArray(parsed)) {
             setProviders(parsed);
           }
         } catch {}
       }
     };
     window.addEventListener('storage', onStorage);
     return () => window.removeEventListener('storage', onStorage);
   }, []);
 
   const addProvider = (p: Omit<ProviderItem, 'id'>) => {
     setProviders((prev) => {
       const nextId = prev.reduce((m, x) => Math.max(m, x.id), 0) + 1;
       return [...prev, { id: nextId, verified: false, ...p }];
     });
   };
 
   const deleteProvider = (id: number) => {
     setProviders((prev) => prev.filter((p) => p.id !== id));
   };
 
   const updateProvider = (id: number, data: Partial<ProviderItem>) => {
     setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
   };
 
   const toggleVerification = (id: number) => {
     setProviders((prev) =>
       prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p))
     );
   };
 
   const stats = useMemo(() => {
     const total = providers.length;
     const verifiedCount = providers.filter((p) => p.verified).length;
     const pendingCount = total - verifiedCount;
     return { total, verifiedCount, pendingCount };
   }, [providers]);
 
   return (
     <ProvidersContext.Provider
       value={{ providers, addProvider, deleteProvider, updateProvider, toggleVerification, stats }}
     >
       {children}
     </ProvidersContext.Provider>
   );
 }
 
 export function useProvidersContext() {
   const ctx = useContext(ProvidersContext);
   if (!ctx) throw new Error('useProvidersContext must be used within ProvidersProvider');
   return ctx;
 }
