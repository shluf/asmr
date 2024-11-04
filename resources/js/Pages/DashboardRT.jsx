import Bantuan from '@/Components/Contents/Bantuan';
import DashboardContent from '@/Components/Contents/RT/DashboardContent';
import PengajuanMasalah from '@/Components/Contents/RT/PengajuanMasalah';
import RekapPengajuan from '@/Components/Contents/RT/RekapPengajuan';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ currentPage, idRT }) {
    const renderContent = () => {
        switch(currentPage) {
            case 'dashboard':
                return <DashboardContent idRT={idRT} />;
            case 'pengajuanMasalah':
                return <PengajuanMasalah idRT={idRT} />;
            case 'rekapPengajuan':
                return <RekapPengajuan idRT={idRT} />;
            case 'bantuan':
                return <Bantuan />;
            default:
                return <DashboardContent idRT={idRT} />;
        }
    }

    return (
        <DashboardLayout color={'yellow'}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
