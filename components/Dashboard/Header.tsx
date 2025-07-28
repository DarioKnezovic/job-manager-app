import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useSession } from '../../ctx';

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const { signOut } = useSession();

    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Content title="JobPilot" titleStyle={styles.title} />
            <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                    <Appbar.Action
                        icon="account-circle"
                        color="#333"
                        onPress={() => setMenuVisible(true)}
                    />
                }
            >
                <Menu.Item onPress={() => {}} title="Profile" />
                <Menu.Item onPress={() => {}} title="Settings" />
                <Menu.Item onPress={signOut} title="Logout" />
            </Menu>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    header: { backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold' },
});