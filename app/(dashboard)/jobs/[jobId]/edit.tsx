import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, TextInput, Button, Title } from 'react-native-paper';
import { router } from 'expo-router';

type JobStatus = 'pending' | 'in progress' | 'done';

interface Job {
    id: string;
    workerName: string;
    date: string;
    time: string;
    customerName: string;
    address: string;
    phone: string;
    description: string;
    status: JobStatus;
}

const mockJob: Job = {
    id: '1',
    workerName: 'Alice Smith',
    date: '2024-06-15',
    time: '14:00',
    customerName: 'John Doe',
    address: '123 Main St, Springfield',
    phone: '+1234567890',
    description: 'Fix leaking pipe in the kitchen.',
    status: 'in progress',
};

export default function EditJobScreen() {
    const [form, setForm] = useState<Job>({ ...mockJob });

    const handleChange = (key: keyof Job, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        // Add save logic here (API call, etc.)
        router.back();
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Edit Job" />
            </Appbar.Header>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title>Edit Job Details</Title>
                        <TextInput
                            label="Assigned Worker"
                            value={form.workerName}
                            onChangeText={v => handleChange('workerName', v)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Date"
                            value={form.date}
                            onChangeText={v => handleChange('date', v)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Time"
                            value={form.time}
                            onChangeText={v => handleChange('time', v)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Customer Name"
                            value={form.customerName}
                            onChangeText={v => handleChange('customerName', v)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Address"
                            value={form.address}
                            onChangeText={v => handleChange('address', v)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Phone"
                            value={form.phone}
                            onChangeText={v => handleChange('phone', v)}
                            style={styles.input}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            label="Description"
                            value={form.description}
                            onChangeText={v => handleChange('description', v)}
                            style={styles.input}
                            multiline
                        />
                        <TextInput
                            label="Status"
                            value={form.status}
                            onChangeText={v => handleChange('status', v as JobStatus)}
                            style={styles.input}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={handleSave}>
                            Save
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
    input: { marginBottom: 12 },
});