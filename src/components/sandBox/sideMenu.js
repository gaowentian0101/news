import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import {
  HomeOutlined, UserOutlined, UnorderedListOutlined,
  LockOutlined, TeamOutlined, SolutionOutlined,
  ReadOutlined, FormOutlined, DeleteOutlined,
  PieChartOutlined, ContainerOutlined, CheckSquareOutlined,
  OrderedListOutlined, FolderAddOutlined, InteractionOutlined,
  UploadOutlined, VerticalAlignBottomOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
const { Sider } = Layout;
const iconList = {
  '/home': <HomeOutlined />,
  '/user-manage': <UserOutlined />,
  '/user-manage/list': <UnorderedListOutlined />,
  '/right-manage': <LockOutlined />,
  '/right-manage/role/list': <TeamOutlined />,
  '/right-manage/right/list': <SolutionOutlined />,
  '/news-manage': <ReadOutlined />,
  '/news-manage/add': <FormOutlined />,
  '/news-manage/draft': <DeleteOutlined />,
  '/news-manage/category': <PieChartOutlined />,
  '/audit-manage': <ContainerOutlined />,
  '/audit-manage/audit': <CheckSquareOutlined />,
  '/audit-manage/list': <OrderedListOutlined />,
  '/publish-manage': <FolderAddOutlined />,
  '/publish-manage/unpublished': <InteractionOutlined />,
  '/publish-manage/published': <UploadOutlined />,
  '/publish-manage/sunset': <VerticalAlignBottomOutlined />
}

function SideMenu(props) {
  const [menu, setmenu] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2000/rights?_embed=children').then(res => {
      const list = res.data
      console.log(iconList);
      list.map(item => {
        console.log(item.key);
        item.icon = <DeleteOutlined />
        // item.icon = item.key == key ? item.icon == iconList[key] : ''
        item.children = item.children.filter(ele => ele.pagepermisson === 1)
        return item
      })
      setmenu(list)
    })
  }, [])
  const onClick = (item) => {
    props.history.push(item.key)
  }
  return (
    <Sider trigger={null} collapsible >
      <div className="logo" style={{
        fontSize: '20px', color: 'white', textAlign: 'center', height: '32px',
        margin: '16px',
        background: 'rgba(255, 255, 255, 0.3)'
      }} >新闻管理系统</div>
      <Menu
        defaultSelectedKeys={['/home']}
        mode="inline"
        theme="dark"
        // inlineCollapsed={collapsed}
        onClick={onClick}
        items={menu}
      />
    </Sider>
  )
}
export default withRouter(SideMenu)