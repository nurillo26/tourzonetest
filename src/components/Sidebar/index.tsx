import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { BarChartOutlined, FileTextOutlined, PieChartOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();

  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={220}
      style={{
        background: '#001529',
        minHeight: '100vh',
        color: '#fff',
      }}>
      <div style={{ color: '#fff', padding: 16, fontWeight: 'bold' }}>
        <Link to={'/'} style={{ color: '#fff', textDecoration: 'none' }}>
          TourZone
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}
        items={[
          {
            key: '/sales',
            icon: <PieChartOutlined />,
            label: <Link to="/sales">Sales Overview</Link>,
          },
          {
            key: '/utilisation',
            icon: <BarChartOutlined />,
            label: <Link to="/utilisation">Utilisation Overview</Link>,
          },
          {
            key: '/balance',
            icon: <FileTextOutlined />,
            label: <Link to="/balance">Balance Overview</Link>,
          },
        ]}></Menu>
    </Sider>
  );
};

export default Sidebar;
