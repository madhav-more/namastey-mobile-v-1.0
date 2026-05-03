import { create } from 'zustand';
import bookingService from '../services/booking.service';
import dataService from '../services/data.service';

const useBookingStore = create((set, get) => ({
  // Static data
  cities: [],
  packages: [],
  themes: [],
  addons: [],
  dataLoading: false,

  // Booking flow state (wizard)
  bookingForm: {
    fromCity: null,
    fromArea: null,
    pickupAddress: '',
    toCity: null,
    toArea: null,
    dropAddress: '',
    scheduledDate: null,
    scheduledTime: '',
    selectedPackage: null,
    selectedTheme: null,
    selectedAddons: [],
    specialInstructions: '',
  },

  // User bookings
  bookings: [],
  selectedBooking: null,
  isLoading: false,
  error: null,

  // Load static data
  loadStaticData: async () => {
    if (get().cities.length > 0) return; // Already loaded
    set({ dataLoading: true });
    try {
      const [cities, packages, themes, addons] = await Promise.all([
        dataService.getCities(),
        dataService.getPackages(),
        dataService.getThemes(),
        dataService.getAddons(),
      ]);
      set({ cities, packages, themes, addons });
    } catch (_) {
      // Use local fallback if needed
    } finally {
      set({ dataLoading: false });
    }
  },

  // Booking form setters
  setBookingField: (field, value) => {
    set((state) => ({
      bookingForm: { ...state.bookingForm, [field]: value },
    }));
  },
  toggleAddon: (addon) => {
    const current = get().bookingForm.selectedAddons;
    const exists = current.find((a) => a.id === addon.id);
    const updated = exists
      ? current.filter((a) => a.id !== addon.id)
      : [...current, addon];
    set((state) => ({
      bookingForm: { ...state.bookingForm, selectedAddons: updated },
    }));
  },
  resetBookingForm: () => {
    set({
      bookingForm: {
        fromCity: null, fromArea: null, pickupAddress: '',
        toCity: null, toArea: null, dropAddress: '',
        scheduledDate: null, scheduledTime: '',
        selectedPackage: null, selectedTheme: null,
        selectedAddons: [], specialInstructions: '',
      },
    });
  },

  // Computed: total price
  getBookingTotal: () => {
    const { selectedPackage, selectedAddons } = get().bookingForm;
    const base = selectedPackage?.price || 0;
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return base + addonsTotal;
  },

  // Create booking
  createBooking: async () => {
    const form = get().bookingForm;
    set({ isLoading: true, error: null });
    try {
      const payload = {
        fromCity: form.fromCity?.name || '',
        fromArea: form.fromArea?.name || '',
        pickupAddress: form.pickupAddress,
        toCity: form.toCity?.name || '',
        toArea: form.toArea?.name || '',
        dropAddress: form.dropAddress,
        scheduledDate: form.scheduledDate?.toISOString(),
        scheduledTime: form.scheduledTime,
        packageId: form.selectedPackage?.id,
        culturalThemeId: form.selectedTheme?.id || '',
        addonIds: form.selectedAddons.map((a) => a.id),
        specialInstructions: form.specialInstructions,
      };
      const booking = await bookingService.createBooking(payload);
      set((state) => ({
        bookings: [booking, ...state.bookings],
        isLoading: false,
      }));
      return { success: true, booking };
    } catch (err) {
      const message = err.response?.data?.message || 'Booking failed.';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Fetch user's bookings
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const bookings = await bookingService.getMyBookings();
      set({ bookings, isLoading: false });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load bookings.';
      set({ error: message, isLoading: false });
    }
  },

  // Fetch single booking
  fetchBookingById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const booking = await bookingService.getBookingById(id);
      set({ selectedBooking: booking, isLoading: false });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load booking.';
      set({ error: message, isLoading: false });
    }
  },

  // Cancel booking
  cancelBooking: async (id, reason = '') => {
    set({ isLoading: true, error: null });
    try {
      const updated = await bookingService.cancelBooking(id, reason);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        selectedBooking: state.selectedBooking?._id === id ? updated : state.selectedBooking,
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Cancellation failed.';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useBookingStore;
