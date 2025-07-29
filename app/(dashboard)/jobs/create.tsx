import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { router } from 'expo-router';
import { JobStatus } from '../../../types/job';
import { createJob } from "../../../services/jobService";
import Dropdown from '../../../components/Reusable/Dropdown';
import { useToast } from "../../../contexts/ToastContext";

const mockWorkers = [
    { id: 'w1', name: 'Alice' },
    { id: 'w2', name: 'Bob' },
    { id: 'w3', name: 'Charlie' },
];

export default function JobCreation() {
    const [job, setJob] = useState({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        assignedTo: '',
        status: JobStatus.Pending,
    });
    const { showToast } = useToast();

    const handleChange = (field: string, value: string) => {
        setJob(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            await createJob({
                title: job.title,
                description: job.description,
                date: job.date,
                customerName: job.customerName,
                customerAddress: job.customerAddress,
                customerPhone: job.customerPhone,
                assignedTo: job.assignedTo,
                status: job.status,
            });

            showToast('Job created successfully!', 'success');
            router.back();
        } catch (error) {
            showToast('Error creating job', 'error');
            console.error('Error creating job:', error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <Text style={styles.header}>Create New Job</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Title *</Text>
                    <TextInput
                        style={styles.input}
                        value={job.title}
                        onChangeText={(value) => handleChange('title', value)}
                        placeholder="Job title"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={job.description}
                        onChangeText={(value) => handleChange('description', value)}
                        placeholder="Job description"
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Date *</Text>
                    <TextInput
                        style={styles.input}
                        value={job.date}
                        onChangeText={(value) => handleChange('date', value)}
                        placeholder="YYYY-MM-DD"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Customer Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={job.customerName}
                        onChangeText={(value) => handleChange('customerName', value)}
                        placeholder="Customer name"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Customer Address</Text>
                    <TextInput
                        style={styles.input}
                        value={job.customerAddress}
                        onChangeText={(value) => handleChange('customerAddress', value)}
                        placeholder="Customer address"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Customer Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={job.customerPhone}
                        onChangeText={(value) => handleChange('customerPhone', value)}
                        placeholder="Customer phone"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Assign To</Text>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            options={[
                                ...mockWorkers.map(w => ({ label: w.name, value: w.id }))
                            ]}
                            selectedValue={job.assignedTo}
                            onValueChange={value => handleChange('assignedTo', value)}
                            placeholder="Select worker"
                        />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            options={[
                                { label: 'Pending', value: JobStatus.Pending },
                                { label: 'In Progress', value: JobStatus.InProgress },
                                { label: 'Completed', value: JobStatus.Completed },
                            ]}
                            selectedValue={job.status}
                            onValueChange={value => handleChange('status', value)}
                            placeholder="Select status"
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>Create Job</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        overflow: 'hidden',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 40,
    },
    submitButton: {
        backgroundColor: '#0066cc',
        padding: 16,
        borderRadius: 6,
        flex: 1,
        marginLeft: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        borderRadius: 6,
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '600',
        fontSize: 16,
    },
});