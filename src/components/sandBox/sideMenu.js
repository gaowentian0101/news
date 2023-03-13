import React from 'react'
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
const { Sider } = Layout;
function sideMenu(props) {
  // const [collapsed, setCollapsed] = useState(false);
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('首页', '/home', <PieChartOutlined />),
    getItem('用户列表', '/user-manage/list', <DesktopOutlined />),
    getItem('角色列表', '/right-manage/role/list', <DesktopOutlined />),
    getItem('新闻列表', '/right-manage/right/list', <DesktopOutlined />),

  ];
  return (
    <Sider trigger={null} collapsible >
      <div className="logo" style={{
        fontSize: '20px', color: 'white', textAlign: 'center', height: '32px',
        margin: '16px',
        background: 'rgba(255, 255, 255, 0.3)'
      }} >管理系统</div>
      <Menu
        defaultSelectedKeys={['/right-manage/role/list']}
        mode="inline"
        theme="dark"
        // inlineCollapsed={collapsed}
        onClick={() => {
          console.log(props);
          // items.map((item) => {
          //   console.log(item.key);
          //   return item
          // })
        }}
        items={items}
      />
    </Sider>
  )
}
export default withRouter(sideMenu)
