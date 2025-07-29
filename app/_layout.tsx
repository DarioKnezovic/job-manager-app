import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../ctx';
import { SplashScreenController } from '../splash';
import { LoadingProvider, useGlobalLoading } from '../contexts/LoadingContext';
import LoadingIndicator from '../components/Reusable/Loading';
import { View } from 'react-native';
import {ToastProvider} from "../contexts/ToastContext";

// Loading overlay component that shows when isLoading is true
function LoadingOverlay() {
    const { isLoading } = useGlobalLoading();

    if (!isLoading) return null;

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
        }}>
            <LoadingIndicator size="large" />
        </View>
    );
}

export default function Root() {
    return (
        <SessionProvider>
            <ToastProvider>
                <LoadingProvider>
                    <SplashScreenController />
                    <RootNavigator />
                    <LoadingOverlay />
                </LoadingProvider>
            </ToastProvider>
        </SessionProvider>
    );
}

function RootNavigator() {
    const { session } = useSession();

    return (
        <Stack>
            <Stack.Protected guard={Boolean(session)}>
                <Stack.Screen name="(dashboard)" />
            </Stack.Protected>

            <Stack.Protected guard={!Boolean(session)}>
                <Stack.Screen name="login" />
            </Stack.Protected>
        </Stack>
    );
}