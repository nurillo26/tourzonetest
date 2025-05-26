import React, { useState } from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Booking } from '../../types/booking'; // Типы данных из data.json

import HeaderWithControls from './HeaderWithControls';

interface BookingsTableProps {
  data: Booking[];
}

const allColumns: ColumnsType<Booking> = [
  { title: 'Reference', dataIndex: 'reference', key: 'reference' },
  { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Channel', dataIndex: 'channel', key: 'channel' },
  { title: 'Product', dataIndex: 'product', key: 'product' },
  { title: 'Booking Status', dataIndex: 'bookingStatus', key: 'bookingStatus' },
  { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod' },
  { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus' },
];

const BookingsTable: React.FC<BookingsTableProps> = ({ data }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map((col) => col.key as string),
  );

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key],
    );
  };

  const filteredColumns = allColumns.filter((col) => visibleColumns.includes(col.key as string));

  return (
    <>
      <HeaderWithControls
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        allColumns={allColumns}
        data={data}
      />

      <Table rowKey="id" dataSource={data} columns={filteredColumns} />
    </>
  );
};

export default BookingsTable;
