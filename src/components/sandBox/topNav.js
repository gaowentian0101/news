import React, { useState } from 'react';
import { Layout, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Dropdown, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

export default function TopNav() {
  const { Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="www.baidu.com">
          角色
        </a>
      ),
      key: '0',
     
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="www.baidu.com">
          退出登录
        </a>
      ),
      key: '1',
     
    },
  ];
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div style={{ float: 'right', paddingRight: '20px' }}>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size={{
                xs: 12,
                sm: 16,
                md: 20,
                lg: 32,
                xl: 40,
                xxl: 50,
              }} icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>

  )
}
