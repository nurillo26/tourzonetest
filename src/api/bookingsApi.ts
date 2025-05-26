import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getBookings: builder.query<any[], void>({
      query: () => 'bookings',
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsApi;
