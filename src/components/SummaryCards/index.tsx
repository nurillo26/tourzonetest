import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

type Booking = {
  price: number;
  bookingStatus: string;
};

interface Props {
  data: Booking[];
}

const SummaryCards: React.FC<Props> = ({ data }) => {
  const total = data.length;
  const totalPrice = data.reduce((sum, item) => sum + item.price, 0);
  const avgPrice = total ? totalPrice / total : 0;
  const maxPrice = total ? Math.max(...data.map((item) => item.price)) : 0;

  const confirmedCount = data.filter((item) => item.bookingStatus === 'confirmed').length;

  const pendingCount = data.filter(
    (item) => item.bookingStatus === 'pendingSupplier' || item.bookingStatus === 'pendingAgency',
  ).length;

  const cancelledCount = data.filter(
    (item) =>
      item.bookingStatus === 'cancelledSupplier' || item.bookingStatus === 'cancelledAgency',
  ).length;

  const formatCurrency = (value: number) =>
    value.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // styles
  const cardStyle = {
    borderRadius: 8,
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
  };

  const numberStyle = {
    fontSize: 24,
    fontWeight: 600,
  };

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card style={cardStyle}>
          <Text strong>Total product bookings</Text>
          <div style={numberStyle}>{total}</div>
          <div style={{ marginTop: 4, display: 'flex', gap: 10 }}>
            <Text type="success" style={{ fontSize: 12 }}>
              {confirmedCount} confirmed
            </Text>
            <Text type="warning" style={{ fontSize: 12 }}>
              {pendingCount} pending
            </Text>
            <Text type="danger" style={{ fontSize: 12 }}>
              {cancelledCount} cancelled
            </Text>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card style={cardStyle}>
          <Text strong>Total price</Text>
          <div style={numberStyle}>€{formatCurrency(totalPrice)}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Based on {total} bookings
          </Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card style={cardStyle}>
          <Text strong>Avg price</Text>
          <div style={numberStyle}>€{formatCurrency(avgPrice)}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Per booking average
          </Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card style={cardStyle}>
          <Text strong>Max price</Text>
          <div style={numberStyle}>€{formatCurrency(maxPrice)}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Highest booking value
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
