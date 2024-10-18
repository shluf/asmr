import ApprovalRole from "@/Components/Contents/Admin/ApprovalRole";
import BiodataUser from "@/Components/Contents/Admin/BiodataUser";
import DashboardContent from "@/Components/Contents/Admin/DashboardContent";
import TambahRTRW from "@/Components/Contents/Admin/TambahRTRW";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ currentPage }) {
    const renderContent = () => {
        switch (currentPage) {
            case "biodataUser":
                return <BiodataUser />;
            case "approvalRole":
                return <ApprovalRole />;
            case "tambahRTRW":
                return <TambahRTRW />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <DashboardLayout header={"Dashboard Admin"} color={"blue"}>
            <Head title="Dashboard" />
            {renderContent()}
        </DashboardLayout>
    );
}
