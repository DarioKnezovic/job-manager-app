import DashboardHeader from '../../components/DashboardHeader';
import { Slot } from 'expo-router';

export default function DashboardLayout() {
    return (
        <>
            <DashboardHeader />
            <Slot />
        </>
    );
}