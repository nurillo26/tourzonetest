import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DateRange {
  from: string | null;
  to: string | null;
}

interface FiltersState {
  search: string;
  bookingStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  bookingStage: string;
  paymentRef: string;
  extBookingRef: string;
  purchaseDate: DateRange;
  fulfilmentDate: DateRange;
  isSearching: boolean;
}

const initialState: FiltersState = {
  search: '',
  paymentRef: '',
  extBookingRef: '',
  bookingStatus: '',
  paymentMethod: '',
  paymentStatus: '',
  bookingStage: '',
  purchaseDate: { from: null, to: null },
  fulfilmentDate: { from: null, to: null },
  isSearching: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setBookingStatus(state, action: PayloadAction<string>) {
      state.bookingStatus = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    setPaymentStatus(state, action: PayloadAction<string>) {
      state.paymentStatus = action.payload;
    },
    setBookingStage(state, action: PayloadAction<string>) {
      state.bookingStage = action.payload;
    },
    setPaymentRef(state, action: PayloadAction<string>) {
      state.paymentRef = action.payload;
    },
    setExtBookingRef(state, action: PayloadAction<string>) {
      state.extBookingRef = action.payload;
    },
    setPurchaseDate(state, action: PayloadAction<DateRange>) {
      state.purchaseDate = action.payload;
    },
    setFulfilmentDate(state, action: PayloadAction<DateRange>) {
      state.fulfilmentDate = action.payload;
    },
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    resetFilters() {
      return {
        search: '',
        paymentRef: '',
        extBookingRef: '',
        bookingStatus: '',
        paymentMethod: '',
        paymentStatus: '',
        bookingStage: '',
        purchaseDate: { from: null, to: null },
        fulfilmentDate: { from: null, to: null },
        isSearching: false,
      };
    },
  },
});

export const {
  setSearch,
  setBookingStatus,
  setPaymentMethod,
  setPaymentStatus,
  setBookingStage,
  setPaymentRef,
  setExtBookingRef,
  setPurchaseDate,
  setFulfilmentDate,
  setIsSearching,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
