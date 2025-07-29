import { createContext, type PropsWithChildren, use } from 'react';
import { useStorageState } from './useStorageState';
import { Role, Session } from "./types/auth.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: async () => null,
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
                signIn: async (email: string, password: string) => {
                    try {
                        const userCredential = await signInWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            const newSession: Session = {
                                userId: user.uid,
                                token: await user.getIdToken(),
                                email: userData.email,
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                role: userData.role,
                            };
                            setSession(newSession);
                        } else {
                            throw new Error("User data not found in Firestore");
                        }
                    } catch (error) {
                        console.error("Sign-in failed:", error);
                        throw error;
                    }
                    // Perform sign-in logic here
                    const session: Session = {
                        userId: '123456',
                        token: 'abcdefg123456',
                        role: Role.Worker
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
