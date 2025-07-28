import { Card, List } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";

const workerTasks = [
    { id: '1', title: 'Deliver Order #123', time: '10:00 AM' },
    { id: '2', title: 'Pick up Order #124', time: '12:00 PM' },
];

export default function Worker() {
    return (
        <>
            <List.Section title="Today's Tasks">
                {workerTasks.map((task) => (
                    <Card key={task.id} style={styles.card}>
                        <Card.Content>
                            <List.Item
                                title={task.title}
                                description={task.time}
                                left={props => <List.Icon {...props} icon="clipboard-check-outline" />}
                            />
                        </Card.Content>
                    </Card>
                ))}
            </List.Section>
        </>
    )
}

const styles = StyleSheet.create({
    card: { margin: 8 },
});