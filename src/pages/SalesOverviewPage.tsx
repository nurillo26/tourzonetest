import React from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

import Filters from '../components/Filters';
import SummaryCards from '../components/SummaryCards';
import SalesTabs from '../components/Tabs';
import BookingsTable from '../components/Table';

import { useGetBookingsQuery } from '../api/bookingsApi';
import { extractUniqueOptions } from '../utils/parseOptions';

const SalesOverviewPage = () => {
  const { data, isLoading, error } = useGetBookingsQuery();
  const filters = useSelector((state: RootState) => state.filters);

  const filteredData = React.useMemo(() => {
    if (!data || !filters.isSearching) return [];

    return data.filter((item) => {
      const {
        search,
        bookingStatus,
        paymentMethod,
        paymentStatus,
        bookingStage,
        paymentRef,
        extBookingRef,
        purchaseDate,
        fulfilmentDate,
      } = filters;

      const matchesSearch = search
        ? item.customerName.toLowerCase().includes(search.toLowerCase()) ||
          item.reference.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesBookingStatus = bookingStatus ? item.bookingStatus === bookingStatus : true;
      const matchesPaymentMethod = paymentMethod ? item.paymentMethod === paymentMethod : true;
      const matchesPaymentStatus = paymentStatus ? item.paymentStatus === paymentStatus : true;
      const matchesBookingStage = bookingStage ? item.bookingStage === bookingStage : true;
      const matchesPaymentRef = paymentRef ? item.paymentRef?.includes(paymentRef) : true;
      const matchesExtBookingRef = extBookingRef
        ? item.extBookingRef?.includes(extBookingRef)
        : true;

      const date = new Date(item.date);

      const matchesPurchaseDate =
        (!purchaseDate.from || new Date(purchaseDate.from) <= date) &&
        (!purchaseDate.to || new Date(purchaseDate.to) >= date);

      const fulfilment = new Date(item.fulfilmentDate);
      const matchesFulfilmentDate =
        (!fulfilmentDate.from || new Date(fulfilmentDate.from) <= fulfilment) &&
        (!fulfilmentDate.to || new Date(fulfilmentDate.to) >= fulfilment);

      return (
        matchesSearch &&
        matchesBookingStatus &&
        matchesPaymentMethod &&
        matchesPaymentStatus &&
        matchesBookingStage &&
        matchesPaymentRef &&
        matchesExtBookingRef &&
        matchesPurchaseDate &&
        matchesFulfilmentDate
      );
    });
  }, [data, filters]);

  const bookingStatusOptions = React.useMemo(
    () => (data ? extractUniqueOptions(data, 'bookingStatus') : []),
    [data],
  );

  const paymentMethodOptions = React.useMemo(
    () => (data ? extractUniqueOptions(data, 'paymentMethod') : []),
    [data],
  );

  const paymentStatusOptions = React.useMemo(
    () => (data ? extractUniqueOptions(data, 'paymentStatus') : []),
    [data],
  );

  const bookingStageOptions = React.useMemo(
    () => (data ? extractUniqueOptions(data, 'bookingStage') : []),
    [data],
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1>Sales Overview</h1>

      {/* Filters */}
      <Filters
        bookingStatusOptions={bookingStatusOptions}
        paymentMethodOptions={paymentMethodOptions}
        paymentStatusOptions={paymentStatusOptions}
        bookingStageOptions={bookingStageOptions}
      />

      {/* Summary card */}
      <SummaryCards data={filters.isSearching ? filteredData : data || []} />

      {/* Tabs */}
      <SalesTabs data={filters.isSearching ? filteredData : data || []} />

      {/* Table */}
      <BookingsTable data={filters.isSearching ? filteredData : data || []} />
    </div>
  );
};

export default SalesOverviewPage;
