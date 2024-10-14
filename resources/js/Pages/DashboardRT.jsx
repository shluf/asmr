import Bantuan from '@/Components/Contents/Bantuan';
import DashboardContent from '@/Components/Contents/RT/DashboardContent';
import PengajuanMasalah from '@/Components/Contents/RT/PengajuanMasalah';
import RekapPengajuan from '@/Components/Contents/RT/RekapPengajuan';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const currentPage = ''
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
        <DashboardLayout header={'Dashboard RT'} color={'yellow'}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
