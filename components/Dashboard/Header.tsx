import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from "../../ctx";

export default function Header() {
    const [visible, setVisible] = useState(false);
    const { signOut } = useSession();

    const handleLogout = () => {
        signOut();
        setVisible(false);
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>JobPilot</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Ionicons name="person-circle-outline" size={32} color="#333" />
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    onPress={() => setVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdown}>
                            <TouchableOpacity style={styles.item}>
                                <Text>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLogout} style={styles.item}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </View>
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
    dropdownContainer: {
        position: 'absolute',
        top: 56, // Adjust based on header height
        right: 0, // Match header padding
    },
    dropdown: {
        marginTop: 62,
        backgroundColor: '#fff',
        borderRadius: 8,
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