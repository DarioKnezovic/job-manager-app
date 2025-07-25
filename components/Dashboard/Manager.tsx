import React from 'react';
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {router} from "expo-router";

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
    return (
        <>
            <Text style={styles.sectionTitle}>Tasks to Assign</Text>
            <FlatList
                data={managerTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => handleJobPress(item.id)} style={styles.titleContainer}>
                            <Text style={styles.listTitle}>{item.title}</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownContainer}>
                            <Picker
                                selectedValue={selectedWorkers[item.id] || ''}
                                style={styles.picker}
                                onValueChange={(value) =>
                                    setSelectedWorkers((prev) => ({ ...prev, [item.id]: value }))
                                }
                            >
                                <Picker.Item label="Assign worker" value="" />
                                {mockWorkers.map((worker) => (
                                    <Picker.Item key={worker.id} label={worker.name} value={worker.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    titleContainer: { flex: 1 },
    listTitle: { fontSize: 16, fontWeight: 'bold' },
    dropdownContainer: { width: 150 },
    picker: { height: 40, width: '100%' },
});