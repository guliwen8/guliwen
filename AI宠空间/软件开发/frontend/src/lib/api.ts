import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.petcare.ai/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  getOtp: (phone: string) => api.post('/auth/otp', { phone }),
  login: (phone: string, code: string) => api.post('/auth/login', { phone, code }),
  register: (data: any) => api.post('/auth/register', data),
};

export const bookingApi = {
  getServices: () => api.get('/services'),
  createBooking: (data: any) => api.post('/bookings', data),
  getMyBookings: (status?: string) => api.get('/bookings', { params: { status } }),
};

export const adminApi = {
  getKpi: () => api.get('/admin/dashboard/kpi'),
  getBookings: (params: any) => api.get('/admin/bookings', { params }),
  updateBookingStatus: (id: string, status: string) => 
    api.patch(`/admin/bookings/${id}/status`, { status }),
  triggerCampaign: (segmentId: string, templateId: string) =>
    api.post('/admin/users/segment-campaign', { segment_id: segmentId, campaign_template_id: templateId }),
};

export default api;
