import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';
import type { Booking } from '../types/booking';

export const exportToExcel = (data: Booking[], fileName = 'bookings.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const cols = Object.keys(data[0] || {}).map((key) => ({
    wch:
      Math.max(key.length, ...data.map((row) => String(row[key as keyof Booking] || '').length)) +
      2,
  }));
  worksheet['!cols'] = cols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};

export const exportToPDF = (data: Booking[], fileName = 'bookings.pdf') => {
  const doc = new jsPDF({ orientation: 'landscape' });

  autoTable(doc, {
    head: [
      [
        'Reference',
        'Customer Name',
        'Email',
        'Price',
        'Date',
        'Channel',
        'Product',
        'Booking Status',
        'Payment Method',
        'Payment Status',
      ],
    ],
    body: data.map((item) => [
      item.reference,
      item.customerName,
      item.email,
      item.price,
      dayjs(item.date).format('DD MMM YYYY'),
      item.channel,
      item.product,
      item.bookingStatus,
      item.paymentMethod,
      item.paymentStatus,
    ]),
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 30 },
      2: { cellWidth: 40 },
      3: { cellWidth: 15 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 },
      6: { cellWidth: 25 },
      7: { cellWidth: 30 },
      8: { cellWidth: 30 },
      9: { cellWidth: 30 },
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 20 },
  });

  doc.save(fileName);
};
