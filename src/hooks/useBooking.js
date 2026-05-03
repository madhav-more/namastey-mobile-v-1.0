import useBookingStore from '../store/bookingStore';

const useBooking = () => {
  const bookings = useBookingStore((s) => s.bookings);
  const selectedBooking = useBookingStore((s) => s.selectedBooking);
  const isLoading = useBookingStore((s) => s.isLoading);
  const error = useBookingStore((s) => s.error);
  const bookingForm = useBookingStore((s) => s.bookingForm);
  const cities = useBookingStore((s) => s.cities);
  const packages = useBookingStore((s) => s.packages);
  const themes = useBookingStore((s) => s.themes);
  const addons = useBookingStore((s) => s.addons);
  const dataLoading = useBookingStore((s) => s.dataLoading);
  const loadStaticData = useBookingStore((s) => s.loadStaticData);
  const setBookingField = useBookingStore((s) => s.setBookingField);
  const toggleAddon = useBookingStore((s) => s.toggleAddon);
  const resetBookingForm = useBookingStore((s) => s.resetBookingForm);
  const createBooking = useBookingStore((s) => s.createBooking);
  const fetchBookings = useBookingStore((s) => s.fetchBookings);
  const fetchBookingById = useBookingStore((s) => s.fetchBookingById);
  const cancelBooking = useBookingStore((s) => s.cancelBooking);
  const getBookingTotal = useBookingStore((s) => s.getBookingTotal);
  const clearError = useBookingStore((s) => s.clearError);

  return {
    bookings, selectedBooking, isLoading, error, bookingForm,
    cities, packages, themes, addons, dataLoading,
    loadStaticData, setBookingField, toggleAddon, resetBookingForm,
    createBooking, fetchBookings, fetchBookingById, cancelBooking,
    getBookingTotal, clearError,
  };
};

export default useBooking;
