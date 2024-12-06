import ApplicationLogo from "@/Components/ApplicationLogo";
import SideBar from "@/Components/partials/SideBar";
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
    name,
    role,
    children,
}) => {
    const user = usePage().props.auth.user;
    const [header, setHeader] = useState();

    useEffect(() => {
        renderHeader(setHeader, user);
    }, []);

    return (
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

            <SideBar color={color} userRole={user.role} />

            <div className="flex flex-col overflow-hidden">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 mt-2 lg:h-[60px] lg:px-6">

                    <div className="flex md:hidden h-14 justify-center items-center px-4">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>

                    <div className="w-full flex-1">
                        <h1 className="hidden sm:block text-lg font-semibold md:text-2xl">
                            {header}
                        </h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className={`group rounded-full text-${color} focus-visible:ring-${color}`}
                            >
                                <div className="relative mb-2">
                                    <div className={`w-10 h-10 rounded-full overflow-hidden p-1 border-[3px] border-${color}`}>
                                        <CircleUser className="h-full w-full" />
                                    </div>
                                    <div className={`absolute -bottom-2 group-hover:-bottom-1 left-1/2 transform transition-all -translate-x-1/2 bg-${color} text-white px-3 rounded-full text-[8px] font-medium`}>
                                        {role}
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {user.role === "Warga" &&
                                <Link href={route('dashboard', { page: "akun" })}>
                                    <DropdownMenuItem className="cursor-pointer" >
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                            }
                            {user.role !== "Admin" &&
                                <Link href={route('dashboard', { page: "bantuan" })}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Bantuan
                                    </DropdownMenuItem>
                                </Link>
                            }
                            <DropdownMenuSeparator />
                            <Link href={route("logout")} method="post" as="button" className="w-full">
                                <DropdownMenuItem className="cursor-pointer">
                                        Logout
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 pb-14 md:p-4 lg:p-6 overflow-auto">
                    <div className="flex flex-1 items-center justify-center rounded-lg border-dashed">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
