import React, { useEffect, useState, useCallback } from 'react'
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
  '/publish-manage/sunset': <VerticalAlignBottomOutlined />,
}

function SideMenu(props) {
  const [menu, setmenu] = useState([])
  // 递归处理菜单树
  const filterMenuTree = useCallback(menuTree => {
    return menuTree.map(item => {
      if (item.pagepermisson === 1) {
        item.icon = iconList[item.key]
        if (item.children && item.children.length > 0) {
          item.children = filterMenuTree(item.children)
        } else {
          item.children = ''
        }
        return item
      }
      return null
    }).filter(item => item != null)
  }, [])
  useEffect(() => {
    axios.get('http://localhost:2000/rights?_embed=children').then(res => {
      const newList = filterMenuTree(res.data) // 递归处理菜单树
      setmenu(newList)
    })
  }, [filterMenuTree])
  const onClick = (item) => {
    props.history.push(item.key)
  }
  return (
    <Sider trigger={null} collapsible >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="logo" style={{
          fontSize: '20px', color: 'white', textAlign: 'center', height: '32px',
          margin: '16px',
          background: 'rgba(255, 255, 255, 0.3)'
        }} >新闻管理系统</div>
        <div style={{ flex: '1', overflow: 'auto' }}>
          <Menu
            selectedKeys={props.location.pathname}
            defaultOpenKeys={['/' + props.location.pathname.split('/')[1]]}
            mode="inline"
            theme="dark"
            // inlineCollapsed={collapsed}
            onClick={onClick}
            items={menu} 
          />
        </div>
      </div>

    </Sider>
  )
}
export default withRouter(SideMenu)