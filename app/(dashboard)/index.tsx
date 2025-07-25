import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const summaryData = [
    { label: 'Users', value: 120 },
    { label: 'Sales', value: 75 },
    { label: 'Revenue', value: '$1,200' },
];

const listData = [
    { id: '1', title: 'Order #123', status: 'Completed' },
    { id: '2', title: 'Order #124', status: 'Pending' },
    { id: '3', title: 'Order #125', status: 'Cancelled' },
];

export default function Dashboard() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Dashboard</Text>
            <View style={styles.summaryRow}>
                {summaryData.map((item) => (
                    <View key={item.label} style={styles.summaryCard}>
                        <Text style={styles.summaryValue}>{item.value}</Text>
                        <Text style={styles.summaryLabel}>{item.label}</Text>
                    </View>
                ))}
            </View>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <FlatList
                data={listData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listTitle}>{item.title}</Text>
                        <Text style={styles.listStatus}>{item.status}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    summaryCard: { alignItems: 'center', backgroundColor: '#f2f2f2', padding: 16, borderRadius: 8, width: 100 },
    summaryValue: { fontSize: 20, fontWeight: 'bold' },
    summaryLabel: { fontSize: 14, color: '#888' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    listItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    listTitle: { fontSize: 16 },
    listStatus: { fontSize: 14, color: '#888' },
});