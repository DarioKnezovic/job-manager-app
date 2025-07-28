import { Card, List } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

const workerTasks = [
    { id: '1', title: 'Deliver Order #123', description: 'Broken dishwasher', status: 'done' },
    { id: '2', title: 'Pick up Order #124', description: 'Dunno', status: 'pending' },
];

export default function Worker() {
    const handleJobPress = (jobId: string) => {
        router.push(`/jobs/${jobId}`);
    };

    const getBackgroundColor = (status: string) => {
        switch (status) {
            case 'done':
                return { backgroundColor: '#4caf50' };
            case 'in progress':
                return { backgroundColor: '#ff9800' };
            case 'pending':
                return { backgroundColor: '#bdbdbd' };
            default:
                return {};
        }
    };

    return (
        <>
            <List.Section title="Today's Tasks">
                {workerTasks.map((task) => (
                    <Card key={task.id} style={[styles.card, getBackgroundColor(task.status)]}>
                        <Card.Content>
                            <List.Item
                                onPress={() => handleJobPress(task.id)}
                                title={task.title}
                                description={task.description}
                                left={props => <List.Icon {...props} icon="clipboard-check-outline" />}
                            />
                        </Card.Content>
                    </Card>
                ))}
            </List.Section>
        </>
    );
}

const styles = StyleSheet.create({
    card: { margin: 8 },
});