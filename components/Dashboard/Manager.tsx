import React from 'react';
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Dropdown from "../Reusable/Dropdown";
import { router } from "expo-router";

const managerTasks = [
    { id: '1', title: 'Assign Order #123', description: 'Assign to worker' },
    { id: '2', title: 'Assign Order #124', description: 'Assign to worker' },
];

const mockWorkers = [
    { id: 'w1', name: 'Alice' },
    { id: 'w2', name: 'Bob' },
    { id: 'w3', name: 'Charlie' },
];

export default function Manager() {
    const [selectedWorkers, setSelectedWorkers] = useState<{ [key: string]: string }>({});

    const handleJobPress = (jobId: string) => {
        router.push(`/jobs/${jobId}`);
    }

    const handleCreateJob = () => {
        router.push('/jobs/create');
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}>Tasks to Assign</Text>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreateJob}
                >
                    <Text style={styles.createButtonText}>Create Job</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={managerTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => handleJobPress(item.id)} style={styles.titleContainer}>
                            <Text style={styles.listTitle}>{item.title}</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownContainer}>
                            <Dropdown
                                options={[
                                    ...mockWorkers.map(w => ({ label: w.name, value: w.id }))
                                ]}
                                selectedValue={selectedWorkers[item.id] || ''}
                                onValueChange={value => setSelectedWorkers(prev => ({ ...prev, [item.id]: value }))}
                                placeholder="Assign worker"
                            />
                        </View>
                    </View>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: { fontSize: 18, fontWeight: '600' },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    titleContainer: { flex: 1 },
    listTitle: { fontSize: 16, fontWeight: 'bold' },
    dropdownContainer: { width: 150 },
    picker: { height: 40, width: '100%' },
    createButton: {
        backgroundColor: '#0066cc',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    createButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});