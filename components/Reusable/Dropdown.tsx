import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';

type Option = { label: string; value: string };

interface DropdownProps {
    options: Option[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    allowDeselect?: boolean; // New optional prop
}

export default function Dropdown({
        options,
        selectedValue,
        onValueChange,
        placeholder,
        allowDeselect = false
    }: DropdownProps) {
    const [visible, setVisible] = useState(false);

    const selectedOption = options.find(opt => opt.value === selectedValue);
    const displayText = selectedValue && selectedOption
        ? selectedOption.label
        : placeholder || 'Select';

    return (
        <>
            <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
                <View style={styles.dropdownContent}>
                    <Text style={styles.displayText}>{displayText}</Text>
                    {allowDeselect && selectedValue && (
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                onValueChange('');
                            }}
                            style={styles.clearButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={styles.clearButtonText}>×</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
            <Modal transparent visible={visible} animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.menu}>
                        <FlatList
                            data={options}
                            keyExtractor={item => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => {
                                        onValueChange(item.value);
                                        setVisible(false);
                                    }}
                                >
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    dropdown: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
    dropdownContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    displayText: {
        flex: 1,
    },
    overlay: { width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' },
    menu: { backgroundColor: '#fff', borderRadius: 6, minWidth: 200, padding: 10, margin: 'auto', minHeight: 100 },
    item: { padding: 10 },
    clearButton: {
        paddingLeft: 8,
    },
    clearButtonText: {
        fontSize: 18,
        color: '#999',
        fontWeight: 'bold',
    },
});