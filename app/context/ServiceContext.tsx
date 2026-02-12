 'use client';
 
 import React from 'react';
 import { ProvidersProvider, useProvidersContext } from './ProvidersContext';
 
 export function ServiceProvider({ children }: { children: React.ReactNode }) {
   return <ProvidersProvider>{children}</ProvidersProvider>;
 }
 
 export function useServiceContext() {
   return useProvidersContext();
 }
