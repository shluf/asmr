import ApplicationLogo from "@/Components/ApplicationLogo";
import AdminSidebBar from "@/Components/SideBar/AdminSideBar";
import RTSideBar from "@/Components/SideBar/RTSideBar";
import RWSideBar from "@/Components/SideBar/RWSideBar";
import WargaSideBar from "@/Components/SideBar/WargaSideBar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { renderHeader } from "@/utility/renderHeader";
import { Link, usePage } from "@inertiajs/react";
import {
    CircleUser,
} from "lucide-react";
import { useEffect, useState } from "react";

const DashboardLayout = ({
    color = "yellow",
    children,
}) => {
    const user = usePage().props.auth.user;
    const [header, setHeader] = useState();

    useEffect(() => {
        renderHeader(setHeader, user);
    }, []);

    return (
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {user.role === "RT" ? (
                <RTSideBar color={color} />
            ) : user.role === "RW" ? (
                <RWSideBar color={color} />
            ) : user.role === "Admin" ? (
                <AdminSidebBar color={color} />
            ) : (
                <WargaSideBar color={color} />
            )}

            <div className="flex flex-col overflow-hidden">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">

                <div className="flex md:hidden h-14 justify-center items-center px-4">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>

                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            {header}
                        </h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className={`rounded-full text-${color} focus-visible:ring-${color}`}
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={route("profile.edit")}>
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={route("logout")} method="post">
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 pb-14 md:p-4 lg:p-6 overflow-auto">
                    <div className="flex flex-1 items-center justify-center rounded-lg border-dashed shadow-sm">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
