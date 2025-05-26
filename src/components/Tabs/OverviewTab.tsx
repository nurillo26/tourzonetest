import React from 'react';
import { capitalizeWords } from '../../utils/formatText';

import { Card, Col, Row, Typography } from 'antd';
import Chart from 'react-apexcharts';

const { Title, Text } = Typography;

interface OverviewTabProps {
  data: any[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  const groupByChannel = data.reduce((acc: any, curr) => {
    const channel = curr.channel || 'Unknown';
    if (!acc[channel]) {
      acc[channel] = { count: 0, totalPrice: 0 };
    }
    acc[channel].count++;
    acc[channel].totalPrice += curr.price;
    return acc;
  }, {});

  const categories = Object.keys(groupByChannel);

  const countSeries = Object.values(groupByChannel).map((item: any) => item.count);

  const avgPriceSeries = Object.values(groupByChannel).map((item: any) =>
    (item.totalPrice / item.count).toFixed(2),
  );

  const totalPriceSeries = Object.values(groupByChannel).map(
    (item: any) => +item.totalPrice.toFixed(2),
  );

  return (
    <div>
      <div style={{ padding: 8 }}>
        <Row gutter={[16, 16]} align="stretch">
          {/* Pie Chart */}
          <Col xs={24} md={8}>
            <Card style={{ height: '100%' }}>
              <Title level={5}>Nr. of Bookings</Title>
              <Text type="secondary">Distribution by channel</Text>
              <Chart
                key={`pie-${countSeries.join(',')}`}
                type="pie"
                height={250}
                series={countSeries}
                options={{
                  labels: categories.map(capitalizeWords),
                  legend: { position: 'bottom' },
                }}
              />
            </Card>
          </Col>

          {/* Bar Chart */}
          <Col xs={24} md={8}>
            <Card style={{ height: '100%' }}>
              <Title level={5}>Per Booking Average Price</Title>
              <Text type="secondary">By channel</Text>
              <Chart
                key={`bar-${avgPriceSeries.join(',')}`}
                type="bar"
                height={250}
                series={[
                  {
                    name: 'Avg Price',
                    data: avgPriceSeries.map((val) => parseFloat(val)),
                  },
                ]}
                options={{
                  chart: { toolbar: { show: false } },
                  xaxis: { categories: categories.map(capitalizeWords) },
                  legend: { show: false },
                }}
              />
            </Card>
          </Col>

          {/* Donut Chart */}
          <Col xs={24} md={8}>
            <Card style={{ height: '100%' }}>
              <Title level={5}>Income</Title>
              <Text type="secondary">Distribution by channel</Text>
              <Chart
                key={`donut-${totalPriceSeries.join(',')}`}
                type="donut"
                height={250}
                series={totalPriceSeries}
                options={{
                  labels: categories.map(capitalizeWords),
                  legend: { position: 'bottom' },
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OverviewTab;
