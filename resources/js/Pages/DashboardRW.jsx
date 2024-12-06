import Bantuan from '@/Components/Contents/Bantuan';
import DashboardContent from '@/Components/Contents/RW/DashboardContent';
import PengajuanMasalah from '@/Components/Contents/RW/PengajuanMasalah';
import RekapPengajuan from '@/Components/Contents/RW/RekapPengajuan';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ currentPage, idRW, name, role }) {
    const renderContent = () => {
        switch(currentPage) {
            case 'dashboard':
                return <DashboardContent idRW={idRW} />;
            case 'pengajuanMasalah':
                return <PengajuanMasalah idRW={idRW} />;
            case 'rekapPengajuan':
                return <RekapPengajuan idRW={idRW} />;
            case 'bantuan':
                return <Bantuan />;
            default:
                return <DashboardContent idRW={idRW} />;
        }
    }

    return (
        <DashboardLayout color={'orange'} name={name} role={role}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
