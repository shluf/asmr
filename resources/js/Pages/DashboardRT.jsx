import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <DashboardLayout header={'Dashboard RT'} color={'yellow'}>
            <Head title="Dashboard" />
        </DashboardLayout>
    );
}
