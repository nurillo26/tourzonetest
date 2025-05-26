import React from 'react';
import { capitalizeWords } from '../../utils/formatText';

import { Card, Col, Row, Typography } from 'antd';
import Chart from 'react-apexcharts';

const { Title, Text } = Typography;

interface StatusTabProps {
  data: any[];
}

const StatusTab: React.FC<StatusTabProps> = ({ data }) => {
  const { statusLabels, statusSeries, stageLabels, stageSeries } = React.useMemo(() => {
    const statusCounts: Record<string, number> = {};
    const stageCounts: Record<string, number> = {};

    data.forEach((item) => {
      const status = item.bookingStatus || 'Unknown';
      const stage = item.bookingStage || 'Unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
    });

    return {
      statusLabels: Object.keys(statusCounts),
      statusSeries: Object.values(statusCounts),
      stageLabels: Object.keys(stageCounts),
      stageSeries: Object.values(stageCounts),
    };
  }, [data]);

  return (
    <Row gutter={[16, 16]} align="stretch">
      <Col xs={24} md={12}>
        <Card style={{ height: '100%' }}>
          <Title level={4}>Booking Status</Title>
          <Text type="secondary">Distribution by status</Text>
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
      <Col xs={24} md={12}>
        <Card style={{ height: '100%' }}>
          <Title level={4}>Booking Stage</Title>
          <Text type="secondary">Current booking stages</Text>
          <Chart
            key={`stage-${stageSeries.join(',')}`}
            type="bar"
            height={280}
            series={[{ name: 'Bookings', data: stageSeries }]}
            options={{
              chart: { toolbar: { show: false } },
              xaxis: { categories: stageLabels.map(capitalizeWords) },
              legend: { show: false },
              colors: ['#9d6ef2'],
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatusTab;
