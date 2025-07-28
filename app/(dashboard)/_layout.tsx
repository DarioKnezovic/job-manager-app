import Header from '../../components/Dashboard/Header';
import { Slot } from 'expo-router';
import { PaperProvider } from "react-native-paper";

export default function DashboardLayout() {
    return (
        <PaperProvider>
            <Header />
            <Slot />
        </PaperProvider>
    );
}