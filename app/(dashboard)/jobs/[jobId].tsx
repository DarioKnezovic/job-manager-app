import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Card, Button, Text, Title, Paragraph, Chip } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
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
                return { backgroundColor: '#4caf50', color: '#fff' }; // green
            case 'in progress':
                return { backgroundColor: '#ff9800', color: '#fff' }; // orange
            case 'pending':
            default:
                return { backgroundColor: '#bdbdbd', color: '#fff' }; // gray
        }
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Job Details" />
            </Appbar.Header>
            <Card>
                <Card.Content>
                    <Title>Job Details</Title>
                    <Paragraph>
                        <Text style={styles.label}>Assigned Worker: </Text>
                        {mockJob.workerName}
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Date & Time: </Text>
                        {mockJob.date} at {mockJob.time}
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Customer: </Text>
                        {mockJob.customerName}
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Address: </Text>
                        {mockJob.address}
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Phone: </Text>
                        <Text style={styles.phone} onPress={handleCall}>
                            {mockJob.phone}
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Description: </Text>
                        {mockJob.description}
                    </Paragraph>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
    label: { fontWeight: 'bold' },
    phone: { color: '#1976d2', textDecorationLine: 'underline' },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    doneButton: { marginLeft: 8 },
});