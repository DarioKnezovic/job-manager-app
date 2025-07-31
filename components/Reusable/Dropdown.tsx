import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';

type Option = { label: string; value: string };

interface DropdownProps {
    options: Option[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

export default function Dropdown({ options, selectedValue, onValueChange, placeholder }: DropdownProps) {
    const [visible, setVisible] = useState(false);

    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || placeholder || 'Select';

    return (
        <>
            <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
                <Text>{selectedLabel}</Text>
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
    overlay: { width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' },
    menu: { backgroundColor: '#fff', borderRadius: 6, minWidth: 200, padding: 10, margin: 'auto', minHeight: '100' },
    item: { padding: 10 },
});