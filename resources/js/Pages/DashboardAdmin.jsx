import Akun from "@/Components/Contents/Admin/Akun";
import ApprovalRole from "@/Components/Contents/Admin/ApprovalRole";
import BiodataRTRW from "@/Components/Contents/Admin/BiodataRTRW";
import DashboardContent from "@/Components/Contents/Admin/DashboardContent";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    const currentPage = ''
    const renderContent = () => {
        switch(currentPage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'biodataRTRW':
                return <BiodataRTRW />;
            case 'approvalRole':
                return <ApprovalRole />;
            case 'akun':
                return <Akun />;
            default:
                return <DashboardContent />;
        }
    }

    return (
        <DashboardLayout header={'Dashboard Admin'} color={'blue'}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
