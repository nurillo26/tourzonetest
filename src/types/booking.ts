export interface Booking {
  id: number;
  reference: string;
  customerName: string;
  email: string;
  price: number;
  date: string;
  channel: string;
  product: string;
  bookingStatus: string;
  bookingStage?: string;
  paymentMethod: string;
  paymentStatus: string;
  participants?: number;
}
