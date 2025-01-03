import Bantuan from '@/Components/Contents/Bantuan';
import Akun from '@/Components/Contents/Warga/Akun';
import DashboardContent from '@/Components/Contents/Warga/DashboardContent';
import HistoriPengajuan from '@/Components/Contents/Warga/HistoriPengajuan';
import Pengajuan from '@/Components/Contents/Warga/Pengajuan';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ currentPage, nik, name, role }) {
    const renderContent = () => {
        switch(currentPage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'pengajuan':
                return <Pengajuan />;
            case 'histori':
                return <HistoriPengajuan nikWarga={nik} />;
            case 'akun':
                return <Akun nikWarga={nik} />;
            case 'bantuan':
                return <Bantuan warga={true} />;
            default:
                return <DashboardContent />;
        }
    }

    return (
        <DashboardLayout color={'green'} name={name} role={role}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
