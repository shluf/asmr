import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

export const description =
    "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export default function Dashboard() {
    return (
        <DashboardLayout header={'Dashboard Admin'} color={'blue'}>
            <Head title="Dashboard" />
        </DashboardLayout>
    );
}
