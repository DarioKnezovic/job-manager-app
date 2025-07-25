import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function JobDetail() {
    const { jobId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Job Detail</Text>
            <Text>Job ID: {jobId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});