import React from 'react';
import { StyleSheet, Linking, View } from 'react-native';
import { Card, Button, Text, Chip, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { router } from "expo-router";
import { Role } from "../../../types/auth";
import { useSession } from "../../../ctx";

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

export default function JobDetails() {
    const { session } = useSession();
    const role = session?.role;

    const handleCall = () => {
        Linking.openURL(`tel:${mockJob.phone}`);
    };

    const getChipStyle = (status: JobStatus) => {
        switch (status) {
            case 'done':
                return { backgroundColor: '#4caf50', color: '#fff' };
            case 'in progress':
                return { backgroundColor: '#ff9800', color: '#fff' };
            case 'pending':
            default:
                return { backgroundColor: '#bdbdbd', color: '#fff' };
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Job Details" />
            </Appbar.Header>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Assigned Worker: </Text>
                        {mockJob.workerName}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Date & Time: </Text>
                        {mockJob.date} at {mockJob.time}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Customer: </Text>
                        {mockJob.customerName}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Address: </Text>
                        {mockJob.address}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Phone: </Text>
                        <Text style={styles.phone} onPress={handleCall}>
                            {mockJob.phone}
                        </Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Description: </Text>
                        {mockJob.description}
                    </Text>
                    <View style={styles.statusRow}>
                        <Text style={styles.label}>Status: </Text>
                        <Chip
                            mode="outlined"
                            style={{ backgroundColor: getChipStyle(mockJob.status).backgroundColor }}
                            textStyle={{ color: getChipStyle(mockJob.status).color }}
                        >
                            {mockJob.status}
                        </Chip>
                    </View>
                </Card.Content>
                <Card.Actions>
                    {role === Role.Manager && (
                        <Button
                            mode="contained"
                            onPress={() => router.push(`/jobs/${mockJob.id}/edit`)}
                        >
                            Edit
                        </Button>
                    )}
                    <Button
                        mode="contained"
                        onPress={() => {}}
                        disabled={mockJob.status === 'done'}
                        style={styles.doneButton}
                    >
                        Mark as Done
                    </Button>
                </Card.Actions>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
    card: { marginVertical: 16 },
    label: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
    phone: { color: '#1976d2', textDecorationLine: 'underline' },
    statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 8 },
    chipContainer: { flex: 1, alignItems: 'center' },
    doneButton: { marginLeft: 8 },
    text: { fontSize: 16, marginBottom: 8 }, // New style for text
});