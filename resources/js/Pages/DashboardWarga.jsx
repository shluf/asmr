import Bantuan from '@/Components/Contents/Bantuan';
import Akun from '@/Components/Contents/Warga/Akun';
import DashboardContent from '@/Components/Contents/Warga/DashboardContent';
import HistoriPengajuan from '@/Components/Contents/Warga/HistoriPengajuan';
import Pengajuan from '@/Components/Contents/Warga/Pengajuan';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ currentPage, nik }) {
    const renderContent = () => {
        switch(currentPage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'pengajuan':
                return <Pengajuan />;
            case 'histori':
                return <HistoriPengajuan />;
            case 'akun':
                return <Akun nikWarga={nik} />;
            case 'bantuan':
                return <Bantuan />;
            default:
                return <DashboardContent />;
        }
    }

    return (
        <DashboardLayout color={'green'}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
