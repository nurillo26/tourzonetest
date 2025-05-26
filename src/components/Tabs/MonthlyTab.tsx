import React from 'react';
import { capitalizeWords } from '../../utils/formatText';

import { Card, Typography } from 'antd';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface MonthlyTabProps {
  data: any[];
}

const MONTH_ORDER = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MonthlyTab: React.FC<MonthlyTabProps> = ({ data }) => {
  const { months, stageSeries } = React.useMemo(() => {
    const monthStageMap: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
      const month = dayjs(item.date).format('MMM');
      const stage = item.bookingStage || 'Unknown';

      if (!monthStageMap[month]) {
        monthStageMap[month] = {};
      }

      if (!monthStageMap[month][stage]) {
        monthStageMap[month][stage] = 0;
      }

      monthStageMap[month][stage]++;
    });

    const allStages = Array.from(new Set(data.map((item) => item.bookingStage || 'Unknown')));
    const months = MONTH_ORDER.filter((month) => monthStageMap[month]);

    const stageSeries = allStages.map((stage) => ({
      name: capitalizeWords(stage),
      data: months.map((month) => monthStageMap[month]?.[stage] || 0),
    }));

    return { months, stageSeries };
  }, [data]);

  return (
    <Card>
      <Title level={4}>Monthly Bookings</Title>
      <Text type="secondary">Booking stages by month</Text>
      <Chart
        key={`monthly-${data.length}`}
        type="bar"
        height={300}
        series={stageSeries}
        options={{
          chart: {
            stacked: true,
            toolbar: { show: false },
          },
          xaxis: {
            categories: months,
          },
          legend: {
            position: 'bottom',
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
        }}
      />
    </Card>
  );
};

export default MonthlyTab;
