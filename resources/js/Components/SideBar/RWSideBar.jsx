import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pageRTRWRoutes } from "@/utility/pageList";
import renderIcon from "@/utility/renderIcon";
import { Link } from "@inertiajs/react";

const RWSideBar = ({ color }) => {

  const pageList = pageRTRWRoutes;

  return (
    <>
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 justify-center items-center px-4 lg:h-[60px] lg:px-6">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
            </div>
            <div className="flex-1">
            <nav className="grid items-start text-sm font-medium">
                    {pageList.map((data, index) => (
                        <NavLink
                            key={index}
                            href={data.route === 'dashboard' ? route('dashboard') : route('dashboard', { page: data.route })}
                            active={ route().current('dashboard', { page: data.route })}
                            className=""
                            color={color}
                        >
                            {renderIcon(data.icon)}
                            {data.name}
                            {data.notification > 0 && (
                                <Badge color={color} className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {data.notification}
                                </Badge>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                {/* Card */}
            </div>
        </div>
    </div>
    <div className="absolute z-20 block md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <nav className="flex">
            {pageList.map((data, index) => (
                <Link
                key={index}
                href={data.route === 'dashboard' ? route('dashboard') : route('dashboard', { page: data.route })}
                className={cn(
                    "flex flex-col items-center justify-center flex-1 py-2 px-1",
                    "transition-colors duration-200 ease-in-out",
                    route().current('dashboard', { page: data.route })
                    ? `text-${color} bg-blue-50"`
                    : "text-gray-600 hover:bg-gray-50"
                )}
                >
                {renderIcon(data.icon, 6)}
                <span className="text-xs text-center font-medium">{data.name}</span>
                </Link>
            ))}
            </nav>
        </div>
    </>
  )
}

export default RWSideBar