import { useState, useCallback } from 'react';

export default function useLoading(initialState = false) {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = useCallback(() => setIsLoading(true), []);
    const stopLoading = useCallback(() => setIsLoading(false), []);

    // Helper to wrap async functions with loading state
    const withLoading = useCallback(
        async (asyncFunction: () => Promise<any>) => {
            try {
                startLoading();
                return await asyncFunction();
            } finally {
                stopLoading();
            }
        },
        [startLoading, stopLoading]
    );

    return {
        isLoading,
        startLoading,
        stopLoading,
        withLoading
    };
}