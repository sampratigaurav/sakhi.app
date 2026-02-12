 'use client';
 
 import React, { createContext, useContext, useCallback, useState } from 'react';
 
 type ToastType = 'success' | 'error' | 'info';
 
 type ToastItem = {
   id: number;
   message: string;
   type: ToastType;
 };
 
 type ToastContextValue = {
   show: (message: string, type?: ToastType) => void;
 };
 
 const ToastContext = createContext<ToastContextValue | null>(null);
 
 export function ToastProvider({ children }: { children: React.ReactNode }) {
   const [toasts, setToasts] = useState<ToastItem[]>([]);
 
   const show = useCallback((message: string, type: ToastType = 'info') => {
     const id = Date.now() + Math.floor(Math.random() * 1000);
     setToasts((list) => [...list, { id, message, type }]);
     setTimeout(() => {
       setToasts((list) => list.filter((t) => t.id !== id));
     }, 3000);
   }, []);
 
   return (
     <ToastContext.Provider value={{ show }}>
       {children}
       <div className="pointer-events-none fixed bottom-6 inset-x-0 z-50 flex justify-center px-4">
         <div className="flex flex-col items-center gap-2">
           {toasts.map((t) => (
             <div
               key={t.id}
               className={`pointer-events-auto rounded-full bg-white px-5 py-3 shadow-lg border ${
                 t.type === 'success'
                   ? 'border-green-600 text-green-700'
                   : t.type === 'error'
                   ? 'border-red-600 text-red-700'
                   : 'border-stone-300 text-[#4A4A4A]'
               }`}
             >
               {t.message}
             </div>
           ))}
         </div>
       </div>
     </ToastContext.Provider>
   );
 }
 
 export function useToast() {
   const ctx = useContext(ToastContext);
   if (!ctx) throw new Error('useToast must be used within ToastProvider');
   return ctx;
 }
