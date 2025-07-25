import Header from '../../components/Dashboard/Header';
import { Slot } from 'expo-router';

export default function DashboardLayout() {
    return (
        <>
            <Header />
            <Slot />
        </>
    );
}