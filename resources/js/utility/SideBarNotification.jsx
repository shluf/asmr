import React from 'react';

import axios from 'axios';
import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  pageAdminRoutes: [
    { name: 'Dashboard', route: '', icon: 'home' },
    { name: 'Biodata User', route: 'biodataUser', icon: 'linechart', notification: 0 },
    { name: 'Rekap Pengajuan Warga', route: 'rekapPengajuan', icon: 'history', notification: 0 },
    { name: 'Approval Role', route: 'approvalRole', icon: 'user', notification: 0 },
    { name: 'Tambah RT/RW', route: 'tambahRTRW', icon: 'settings' }
  ],
  pageRTRWRoutes: [
    { name: 'Dashboard', route: '', icon: 'home'},
    { name: 'Pengajuan Warga', route: 'pengajuanMasalah', icon: 'user', notification: 0 },
    { name: 'Rekap Pengajuan', route: 'rekapPengajuan', icon: 'history', notification: 0 },
    { name: 'Bantuan', route: 'bantuan', icon: 'settings' }
  ],
  pageWargaRoutes: [
    { name: 'Dashboard', route: '', icon: 'home'},
    { name: 'Pengajuan', route: 'pengajuan', icon: 'file-up', notification: 0 },
    { name: 'Histori Pengajuan', route: 'histori', icon: 'history', notification: 0 },
    { name: 'Akun', route: 'akun', icon: 'user' },
    { name: 'Bantuan', route: 'bantuan', icon: 'settings' }
  ],
  updateNotifications: (role, route, count) => 
    set((state) => {
      const routes = `page${role === "RT" || role === "RW" ? "RTRW" : role}Routes`;
      if (!state[routes]) return state;
      
      const updatedRoutes = state[routes].map(item => 
        item.route === route ? { ...item, notification: count } : item
      );
      
      return { [routes]: updatedRoutes };
    })
}));


const fetchNotifications = async (role) => {
  try {
    const response = await axios.get(`/notifications/count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return null;
  }
};

export const useNotificationPolling = (role) => {
  const updateNotifications = useNotificationStore(state => state.updateNotifications);
  
  React.useEffect(() => {
    const pollNotifications = async () => {
      const notifications = await fetchNotifications(role);
      if (notifications) {
        notifications.forEach(({ route, count }) => {
          updateNotifications(role, route, count);
        });
      }
    };

    // Polling setiap 30 detik
    pollNotifications();
    const interval = setInterval(pollNotifications, 20000);

    return () => clearInterval(interval);
  }, [role, updateNotifications]);

  return useNotificationStore(state => state[`page${role === "RT" || role === "RW" ? "RTRW" : role}Routes`]);
};