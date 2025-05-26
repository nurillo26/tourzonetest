import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import OverviewTab from './OverviewTab';
import StatusTab from './StatusTab';
import PaymentTab from './PaymentTab';
import MonthlyTab from './MonthlyTab';

interface Props {
  data: any[];
}

const SalesTabs: React.FC<Props> = ({ data }) => {
  const items: TabsProps['items'] = [
    {
      key: 'overview',
      label: 'Overview',
      children: <OverviewTab data={data} />,
    },
    {
      key: 'status',
      label: 'Status',
      children: <StatusTab data={data} />,
    },
    {
      key: 'payment',
      label: 'Payment',
      children: <PaymentTab data={data} />,
    },
    {
      key: 'monthly',
      label: 'Monthly',
      children: <MonthlyTab data={data} />,
    },
  ];

  return <Tabs defaultActiveKey="overview" items={items} />;
};

export default SalesTabs;
