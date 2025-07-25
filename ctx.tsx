import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { Session, Role } from "./types/auth.ts";

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    const session: Session = {
                        userId: '123456',
                        token: 'abcdefg123456',
                        role: Role.Manager
                    };
                    setSession(session);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext>
    );
}
