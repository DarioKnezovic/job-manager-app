import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, Card, List, ActivityIndicator } from 'react-native-paper';
import { useSession } from '../../ctx';
import { Role } from '../../types/auth';
import Manager from "../../components/Dashboard/Manager";
import Worker from "../../components/Dashboard/Worker";

const managerTasks = [
    { id: '1', title: 'Assign Order #123', description: 'Assign to worker' },
    { id: '2', title: 'Assign Order #124', description: 'Assign to worker' },
];

const workerTasks = [
    { id: '1', title: 'Deliver Order #123', time: '10:00 AM' },
    { id: '2', title: 'Pick up Order #124', time: '12:00 PM' },
];

export default function Dashboard() {
    const { session, isLoading } = useSession();
    const role = session?.role;

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Dashboard" />
            </Appbar.Header>
            {role === Role.Manager ? (
                <Manager />
            ) : (
                <Worker />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    card: { margin: 8 },
});