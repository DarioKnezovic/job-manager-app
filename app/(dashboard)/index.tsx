import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSession } from '../../ctx';
import { Role } from '../../types/auth';
import Manager from "../../components/Dashboard/Manager";

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

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Assume session?.role is either 'manager' or 'worker'
    const role = session?.role;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Dashboard</Text>
            {role === Role.Manager ? (
                <Manager />
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Today's Tasks</Text>
                    <FlatList
                        data={workerTasks}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.listTitle}>{item.title}</Text>
                                <Text style={styles.listDesc}>{item.time}</Text>
                            </View>
                        )}
                    />
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    listItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    listTitle: { fontSize: 16, fontWeight: 'bold' },
    listDesc: { fontSize: 14, color: '#888' },
});