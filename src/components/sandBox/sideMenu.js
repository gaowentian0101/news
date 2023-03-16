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
      // 写法1 通过对接口返回的数据进行操作
      const list = res.data
      list.map(item => {
        item.icon = iconList[item.key]
        // 子节点只有pagepermisson === 1时显示在菜单上 其他均为按钮级别权限
        item.children = item.children && item.children.length > 0 ? item.children.filter(ele => ele.pagepermisson === 1) : ''
        // 显示子节点icon
        item.children = item.children && item.children.length > 0 ? item.children.map(item => { item.icon = iconList[item.key]; return item }) : ''
        return item
      })
      setmenu(res.data)
    })
  }, [])
  // 写法2 根据antd4组件的写法对菜单需要的数据进行封装
  // function getItem(label, key, icon, children, type) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //     type,
  //   }
  // }
  // function getMenuList(menuList) {
  //   return menuList.map((item) => {
  //     //如果pagepermisson===1，并且当前用户的中有当前key（即路径）
  //     if (item.pagepermisson === 1) {
  //       return getItem(
  //         item.label,
  //         item.key,
  //         iconList[item.key],
  //         // item.children && item.children.length > 0 ? getMenuList(item.children) : ''
  //         item.children && item.children.length > 0 ? item.children.filter(ele => ele.pagepermisson === 1) : ''
  //       )
  //     }
  //     return item
  //   })
  // }
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
        items={menu} //写法1
      // items={getMenuList(menu)} 写法2
      />
    </Sider>
  )
}
export default withRouter(SideMenu)