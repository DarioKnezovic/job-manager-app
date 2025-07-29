import React, { useEffect } from 'react';
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Dropdown from "../Reusable/Dropdown";
import { router } from "expo-router";
import { useGlobalLoading } from "../../contexts/LoadingContext";
import { Job } from "../../types/job";
import { getAllJobs } from "../../services/jobService";
import { useToast } from "../../contexts/ToastContext";

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
    const [jobs, setJobs] = useState<Job[]>([]);
    const { withLoading } = useGlobalLoading();
    const { showToast } = useToast();

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        withLoading(async () => {
            try {
                const fetchedJobs = await getAllJobs();
                setJobs(fetchedJobs);
            } catch (error) {
                console.error(error);
                showToast('Failed to load jobs. Please try again.', 'error');
            }
        })
    }

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
                data={jobs}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No jobs available</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.jobCard}>
                        <View style={[styles.statusIndicator,
                            item.status === 'pending' ? styles.statusPending :
                                item.status === 'in progress' ? styles.statusInProgress :
                                    styles.statusCompleted
                        ]} />
                        <TouchableOpacity
                            onPress={() => handleJobPress(item.id)}
                            style={styles.jobContent}
                        >
                            <View style={styles.jobHeader}>
                                <Text style={styles.jobTitle}>{item.title || 'Untitled Job'}</Text>
                                <Text style={styles.jobDate}>{item.date}</Text>
                            </View>

                            <View style={styles.customerInfo}>
                                <Text style={styles.customerName}>{item.customerName}</Text>
                                {item.customerAddress && (
                                    <Text style={styles.customerAddress}>{item.customerAddress}</Text>
                                )}
                            </View>

                            {item.description && (
                                <Text numberOfLines={2} style={styles.description}>
                                    {item.description}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.assignmentSection}>
                            <Text style={styles.assignLabel}>Assign to:</Text>
                            <View style={styles.dropdownContainer}>
                                <Dropdown
                                    options={mockWorkers.map(w => ({ label: w.name, value: w.id }))}
                                    selectedValue={selectedWorkers[item.id] || ''}
                                    onValueChange={value => setSelectedWorkers(prev => ({ ...prev, [item.id]: value }))}
                                    placeholder="Select worker"
                                />
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
    listContent: {
        paddingVertical: 8,
    },
    jobCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eee',
        overflow: 'hidden',
    },
    jobContent: {
        padding: 16,
        paddingBottom: 12,
    },
    statusIndicator: {
        height: 4,
        width: '100%',
    },
    statusPending: {
        backgroundColor: '#FFC107',
    },
    statusInProgress: {
        backgroundColor: '#2196F3',
    },
    statusCompleted: {
        backgroundColor: '#4CAF50',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
    },
    jobDate: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    customerInfo: {
        marginBottom: 8,
    },
    customerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    customerAddress: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    assignmentSection: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    assignLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#555',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
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