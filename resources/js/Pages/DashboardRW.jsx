import Bantuan from '@/Components/Contents/Bantuan';
import DashboardContent from '@/Components/Contents/RW/DashboardContent';
import PengajuanMasalah from '@/Components/Contents/RW/PengajuanMasalah';
import RekapPengajuan from '@/Components/Contents/RW/RekapPengajuan';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ currentPage }) {
    const renderContent = () => {
        switch(currentPage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'pengajuanMasalah':
                return <PengajuanMasalah />;
            case 'rekapPengajuan':
                return <RekapPengajuan />;
            case 'bantuan':
                return <Bantuan />;
            default:
                return <DashboardContent />;
        }
    }

    return (
        <DashboardLayout color={'orange'}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
