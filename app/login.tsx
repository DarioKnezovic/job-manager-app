import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useSession } from "../ctx";
import LoadingIndicator from "../components/Reusable/Loading";
import useLoading from "../hooks/useLoading";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, withLoading } = useLoading();
    const { signIn } = useSession();

    const handleLogin = () => {
        withLoading(async () => {
            try {
                await signIn(email, password);
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.header}>Login</Text>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        disabled={isLoading}
                    />
                    {isLoading ? (
                        <LoadingIndicator size="large" />
                    ) : (
                        <Button mode="contained" onPress={handleLogin} style={styles.button}>
                            Login
                        </Button>
                    )}
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
    card: { padding: 16, elevation: 4 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    input: { marginBottom: 16 },
    button: { marginTop: 16 },
});