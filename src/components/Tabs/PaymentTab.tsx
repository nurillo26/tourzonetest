import React from 'react';
import { capitalizeWords } from '../../utils/formatText';

import { Card, Col, Row, Typography } from 'antd';
import Chart from 'react-apexcharts';

const { Title, Text } = Typography;

interface PaymentTabProps {
  data: any[];
}

const PaymentTab: React.FC<PaymentTabProps> = ({ data }) => {
  const { methodLabels, methodSeries, statusLabels, statusSeries } = React.useMemo(() => {
    const methodCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};

    data.forEach((item) => {
      const method = item.paymentMethod || 'Unknown';
      const status = item.paymentStatus || 'Unknown';
      methodCounts[method] = (methodCounts[method] || 0) + 1;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return {
      methodLabels: Object.keys(methodCounts),
      methodSeries: Object.values(methodCounts),
      statusLabels: Object.keys(statusCounts),
      statusSeries: Object.values(statusCounts),
    };
  }, [data]);

  return (
    <Row gutter={[16, 16]} align="stretch">
      <Col xs={24} md={12}>
        <Card style={{ height: '100%' }}>
          <Title level={4}>Payment Methods</Title>
          <Text type="secondary">Distribution by payment method</Text>
          <Chart
            key={`methods-${methodSeries.join(',')}`}
            type="pie"
            height={280}
            series={methodSeries}
            options={{
              labels: methodLabels.map(capitalizeWords),
              legend: { position: 'bottom' },
            }}
          />
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card style={{ height: '100%' }}>
          <Title level={4}>Payment Status</Title>
          <Text type="secondary">Distribution by payment status</Text>
          <Chart
            key={`status-${statusSeries.join(',')}`}
            type="pie"
            height={280}
            series={statusSeries}
            options={{
              labels: statusLabels.map(capitalizeWords),
              legend: { position: 'bottom' },
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentTab;
