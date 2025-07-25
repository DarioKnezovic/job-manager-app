import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../ctx';
import { SplashScreenController } from '../splash';

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <SessionProvider>
            <SplashScreenController />
            <RootNavigator />
        </SessionProvider>
    );
}

function RootNavigator() {
    const { session } = useSession();

    return (
        <Stack>
            <Stack.Protected guard={session}>
                <Stack.Screen name="(dashboard)" />
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="login" />
            </Stack.Protected>
        </Stack>
    );
}

