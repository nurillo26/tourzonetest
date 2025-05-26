import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setSearch,
  setBookingStatus,
  setPaymentRef,
  setExtBookingRef,
  setPaymentMethod,
  setPaymentStatus,
  setBookingStage,
  setPurchaseDate,
  setFulfilmentDate,
  setIsSearching,
  resetFilters,
} from '../../redux/filter/filterSlice';
import type { RootState } from '../../redux/store';

import { Input, Select, DatePicker, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

import { capitalizeWords } from '../../utils/formatText';

const { Option } = Select;

interface FiltersProps {
  bookingStatusOptions: string[];
  paymentMethodOptions: string[];
  paymentStatusOptions: string[];
  bookingStageOptions: string[];
}

type DateRangeValue = [Dayjs | null, Dayjs | null] | null;

const Filters: React.FC<FiltersProps> = ({
  bookingStatusOptions,
  paymentMethodOptions,
  paymentStatusOptions,
  bookingStageOptions,
}) => {
  const dispatch = useDispatch();
  const {
    search,
    bookingStatus,
    paymentRef,
    extBookingRef,
    paymentMethod,
    paymentStatus,
    bookingStage,
    purchaseDate,
    fulfilmentDate,
  } = useSelector((state: RootState) => state.filters);

  const inputConfigs = [
    {
      value: search,
      setter: setSearch,
      placeholder: 'Search by name, ref, email...',
    },
    {
      value: paymentRef,
      setter: setPaymentRef,
      placeholder: 'Payment ref.',
    },
    {
      value: extBookingRef,
      setter: setExtBookingRef,
      placeholder: 'Ext. booking ref',
    },
  ];

  const selectConfigs = [
    {
      value: bookingStatus,
      setter: setBookingStatus,
      options: bookingStatusOptions,
      placeholder: 'All Booking Statuses',
    },
    {
      value: paymentMethod,
      setter: setPaymentMethod,
      options: paymentMethodOptions,
      placeholder: 'All Payment Methods',
    },
    {
      value: paymentStatus,
      setter: setPaymentStatus,
      options: paymentStatusOptions,
      placeholder: 'All Payment Statuses',
    },
    {
      value: bookingStage,
      setter: setBookingStage,
      options: bookingStageOptions,
      placeholder: 'All Booking Stages',
    },
  ];

  const handleInputChange =
    (actionCreator: (value: string) => any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actionCreator(e.target.value));
    };

  const handleSelectChange = (setter: (value: string) => any) => (value: string) => {
    setter(value);
    dispatch(setter(value));
  };

  const handleDateRangeChange =
    (setter: (val: { from: string | null; to: string | null }) => any) =>
    (dates: DateRangeValue) => {
      if (!dates) return dispatch(setter({ from: null, to: null }));

      const [from, to] = dates;
      const payload = {
        from: from ? from.toISOString() : null,
        to: to ? to.toISOString() : null,
      };

      dispatch(setter(payload));
    };

  const handleSearch = () => {
    dispatch(setIsSearching(true));
  };

  const handleClear = () => {
    dispatch(resetFilters());
    dispatch(setIsSearching(false));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 10,
        border: '1px solid rgb(229, 231, 235)',
        borderRadius: 10,
      }}>
      {/* Inputs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {inputConfigs.map(({ value, setter, placeholder }) => (
          <Input
            key={placeholder}
            value={value}
            onChange={handleInputChange(setter)}
            placeholder={placeholder}
            style={{ width: '32%' }}
          />
        ))}
      </div>

      {/* Selects */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        {selectConfigs.map(({ value, setter, options, placeholder }) => (
          <Select
            key={placeholder}
            value={value}
            onChange={handleSelectChange(setter)}
            style={{ width: 250 }}
            placeholder={placeholder}
            allowClear>
            <Option value="">{placeholder}</Option>
            {options.map((opt) => (
              <Option key={opt} value={opt}>
                {capitalizeWords(opt)}
              </Option>
            ))}
          </Select>
        ))}
      </div>

      {/* Date Pickers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: 10 }}>Purchase Date Range</label>
          <DatePicker.RangePicker
            value={[
              purchaseDate.from ? dayjs(purchaseDate.from) : null,
              purchaseDate.to ? dayjs(purchaseDate.to) : null,
            ]}
            onChange={handleDateRangeChange(setPurchaseDate)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: 10 }}>Fulfilment Date Range</label>
          <DatePicker.RangePicker
            value={[
              fulfilmentDate.from ? dayjs(fulfilmentDate.from) : null,
              fulfilmentDate.to ? dayjs(fulfilmentDate.to) : null,
            ]}
            onChange={handleDateRangeChange(setFulfilmentDate)}
          />
        </div>
      </div>

      {/* Buttions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          style={{ padding: '20px' }}>
          Search
        </Button>

        <Button icon={<CloseOutlined />} onClick={handleClear} style={{ padding: '20px' }}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Filters;
