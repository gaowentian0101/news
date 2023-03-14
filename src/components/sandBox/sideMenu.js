import React from 'react'
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  SmileOutlined,
  SolutionOutlined,
  TeamOutlined,
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
    getItem('用户管理', '/user-manage', <DesktopOutlined />, [
      getItem('用户列表', '/user-manage/list', <SmileOutlined/>)
    ]),
    getItem('权限管理', '/right-manage', <ApartmentOutlined />, [
      getItem('角色列表', '/right-manage/role/list', <TeamOutlined/>),
      getItem('权限列表', '/right-manage/right/list', <SolutionOutlined/>),
    ]),
  ];
  const onClick = (item) => {
    console.log(item);
    console.log(props);
    props.history.push(item.key)
  }
  return (
    <Sider trigger={null} collapsible >
      <div className="logo" style={{
        fontSize: '20px', color: 'white', textAlign: 'center', height: '32px',
        margin: '16px',
        background: 'rgba(255, 255, 255, 0.3)'
      }} >管理系统</div>
      <Menu
        defaultSelectedKeys={['/home']}
        mode="inline"
        theme="dark"
        // inlineCollapsed={collapsed}
        onClick={onClick}
        items={items}
      />
    </Sider>
  )
}
export default withRouter(sideMenu)