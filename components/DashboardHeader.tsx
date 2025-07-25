import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardHeader() {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Dashboard</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Ionicons name="person-circle-outline" size={32} color="#333" />
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.item}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Text>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
        paddingVertical: 8,
        width: 160,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});