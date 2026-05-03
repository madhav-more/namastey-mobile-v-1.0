import api from './api';

const bookingService = {
  createBooking: async (data) => {
    const res = await api.post('/bookings', data);
    return res.data.booking;
  },

  getMyBookings: async () => {
    const res = await api.get('/bookings');
    return res.data.bookings;
  },

  getBookingById: async (id) => {
    const res = await api.get(`/bookings/${id}`);
    return res.data.booking;
  },

  cancelBooking: async (id, cancelReason = '') => {
    const res = await api.put(`/bookings/${id}/cancel`, { cancelReason });
    return res.data.booking;
  },
};

export default bookingService;
