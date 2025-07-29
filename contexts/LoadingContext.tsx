// contexts/LoadingContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useLoading from '../hooks/useLoading';

type LoadingContextType = ReturnType<typeof useLoading>;

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const loadingState = useLoading();

    return (
        <LoadingContext.Provider value={loadingState}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useGlobalLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useGlobalLoading must be used within a LoadingProvider');
    }
    return context;
}