import { pageAdminRoutes, pageRTRWRoutes, pageWargaRoutes } from "./pageList";

export const renderHeader = (setHeader, user) => {
    const pageListRtRw = pageRTRWRoutes;
    const pageListAdmin = pageAdminRoutes;
    const pageListWarga = pageWargaRoutes;

    if (route().current('dashboard', {page: ''})) {
        setHeader("Dashboard " + user.role)
    } else { 
        switch (user.role) {
            case "Admin":
                pageListAdmin.forEach((data) => {
                    if(route().current('dashboard', {page: data.route})) {
                        setHeader(data.name);
                    }
                });
                break;
            case "RT":
            case "RW":
                pageListRtRw.forEach((data) => {
                    if(route().current('dashboard', {page: data.route})) {
                        setHeader(data.name);
                    }
                });
                break;
            case "Warga":
                pageListWarga.forEach((data) => {
                    if(route().current('dashboard', {page: data.route})) {
                        setHeader(data.name);
                    }
                });
                break;
        }
    }
}