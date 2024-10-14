import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react";

const RWSidebBar = ({ color }) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                        <Button
                            variant="outline"
                            size="icon"
                            className="ml-auto h-8 w-8"
                        >
                            <img src="/public/img/ic_group.svg" />
                            <span className="sr-only">
                                Toggle notifications
                            </span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className=""
                                color={color}
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('order')}
                                className=""
                                color={color}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Pengaduan Warga
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </NavLink>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('products')}
                                className=""
                                color={color}
                            >
                                <Package className="h-4 w-4" />
                                Rekap Pengajuan Warga{" "}
                            </NavLink>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('customers')}
                                className=""
                                color={color}
                            >
                                <Users className="h-4 w-4" />
                                Bantuan
                            </NavLink>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        {/* <Card>
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access
                                    to our support team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card> */}
                    </div>
                </div>
            </div>
  )
}

export default RWSidebBar