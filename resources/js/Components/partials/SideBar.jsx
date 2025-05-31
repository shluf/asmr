import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Badge } from "@/components/ui/badge";
import { useManualNotificationRefresh, useNotificationPolling } from "@/utility/SideBarNotification";
import renderIcon from "@/utility/renderIcon";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils"
import axios from "axios";
import { X } from "lucide-react";


const SideBar = ({ color, userRole }) => {
  const routes = useNotificationPolling(userRole);
  const manualRefresh = useManualNotificationRefresh();

  const clearNotification = async (e, jenis) => {
    e.preventDefault();

    try {
      await axios.delete(route('notification.clear'), {
        data: { jenis }, 
      });

      await manualRefresh(userRole)

    } catch (error) {
      console.error("Error clearing notification:", error);
    }
  };

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
                          {routes.map((data, index) => (
                              <NavLink
                                  key={index}
                                  href={
                                      data.route === "dashboard"
                                          ? route("dashboard")
                                          : route("dashboard", {
                                                page: data.route,
                                            })
                                  }
                                  active={route().current("dashboard", {
                                      page: data.route,
                                  })}
                                  className=""
                                  color={color}
                              >
                                  {renderIcon(data.icon)}
                                  {data.name}
                                  {data.notification > 0 && (
                                      <Badge
                                          onClick={(e) =>
                                              clearNotification(e, data.jenis)
                                          }
                                          color={color}
                                          className="group ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                                      >
                                          <span className="group-hover:hidden">
                                              {data.notification}
                                          </span>
                                          <span className="hidden group-hover:block">
                                              <X className="p-1" />
                                          </span>
                                      </Badge>
                                  )}
                              </NavLink>
                          ))}
                      </nav>
                  </div>
                  <div className="mt-auto p-4"></div>
              </div>
          </div>

          <div className="fixed z-20 block md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200">
              <nav className="flex">
                  {routes.map((data, index) => (
                      <Link
                          key={index}
                          href={
                              data.route === "dashboard"
                                  ? route("dashboard")
                                  : route("dashboard", { page: data.route })
                          }
                          className={cn(
                              "flex flex-col items-center justify-center flex-1 py-2 px-1",
                              "transition-colors duration-200 ease-in-out",
                              route().current("dashboard", { page: data.route })
                                  ? `text-${color} bg-${color}-50`
                                  : "text-gray-600 hover:bg-gray-50"
                          )}
                      >
                          {renderIcon(data.icon, 6)}
                          <span className="text-xs text-center font-medium">
                              {data.name}
                          </span>
                      </Link>
                  ))}
              </nav>
          </div>
      </>
  );
}

export default SideBar