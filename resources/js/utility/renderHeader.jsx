const pageAdminRoutes = [
    { name: 'Dashboard', route: ''},
    { name: 'Biodata User', route: 'biodataUser'},
    { name: 'Approval Role', route: 'approvalRole'},
    { name: 'Tambah RT/RW', route: 'tambahRTRW'}
  ]
const pageRTRWRoutes = [
    { name: 'Dashboard', route: ''},
    { name: 'Pengajuan Warga', route: 'pengajuanMasalah'},
    { name: 'Rekap Pengajuan', route: 'rekapPengajuan'},
    { name: 'Bantuan', route: 'bantuan'}
  ]
const pageWargaRoutes = [
    { name: 'Dashboard', route: ''},
    { name: 'Pengajuan', route: 'pengajuan'},
    { name: 'Histori Pengajuan', route: 'histori' },
    { name: 'Akun', route: 'akun'},
    { name: 'Bantuan', route: 'bantuan'}
  ]

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
            default:
                setHeader("Aplikasi Surat Menyurat");
                break;
        }
    }
}