import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button, Card, Text, Title } from 'react-native-paper';
import { useSession } from "../ctx";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useSession();

    const handleLogin = () => {
        signIn();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.header}>Login</Title>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleLogin} style={styles.button}>
                        Login
                    </Button>
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