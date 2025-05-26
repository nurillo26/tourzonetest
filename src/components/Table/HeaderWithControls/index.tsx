import React from 'react';

import { Button, Checkbox, Dropdown, type MenuProps } from 'antd';
import { SettingOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import type { Booking } from '../../../types/booking';
import { exportToExcel, exportToPDF } from '../../../utils/exportData';

interface HeaderWithControlsProps {
  visibleColumns: string[];
  toggleColumn: (key: string) => void;
  allColumns: ColumnsType<Booking>;
  data: Booking[];
}

const HeaderWithControls: React.FC<HeaderWithControlsProps> = ({
  visibleColumns,
  toggleColumn,
  allColumns,
  data,
}) => {
  const exportMenu: MenuProps['items'] = [
    {
      key: 'excel',
      label: 'Export to Excel',
      onClick: () => exportToExcel(data),
    },
    {
      key: 'pdf',
      label: 'Export to PDF',
      onClick: () => exportToPDF(data),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: 16,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
      }}>
      <div>
        <h2 style={{ margin: 0 }}>Raw Data</h2>
        <div style={{ color: 'gray' }}>View and export the filtered booking data</div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Dropdown
          trigger={['click']}
          popupRender={() => (
            <div
              style={{
                padding: 8,
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, .15)',
                borderRadius: 8,
              }}>
              {allColumns.map((col) => (
                <div key={col.key}>
                  <Checkbox
                    checked={visibleColumns.includes(col.key as string)}
                    onChange={() => toggleColumn(col.key as string)}>
                    {typeof col.title === 'function' ? col.key : col.title}
                  </Checkbox>
                </div>
              ))}
            </div>
          )}>
          <Button icon={<SettingOutlined />}>Columns</Button>
        </Dropdown>

        <Dropdown trigger={['click']} menu={{ items: exportMenu }}>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderWithControls;
