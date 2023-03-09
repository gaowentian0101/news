import React, { useState } from 'react';
import { Layout, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
export default function TopNav() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div style={{ float: 'right' }}>
        <Avatar size={{
          xs: 12,
          sm: 16,
          md: 20,
          lg: 32,
          xl: 40,
          xxl: 50,
        }} icon={<UserOutlined />} />
      </div>

      {/* {
        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
      } */}
    </Header>

  )
}
