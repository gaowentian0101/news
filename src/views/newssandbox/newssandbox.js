import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../components/sandBox/SideMenu'
import TopNav from '../../components/sandBox/TopNav'
import Home from './home/Home'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
import Notfound from "./notfound/Notfound"
import { Layout } from 'antd';
import "./newssandbox.css"
const { Content } = Layout;
export default function newssandbox() {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopNav></TopNav>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/user-manage/list' component={UserList}></Route>
                        <Route path='/right-manage/role/list' component={RoleList}></Route>
                        <Route path='/right-manage/right/list' component={RightList}></Route>
                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route path='*' component={Notfound}></Route>
                    </Switch>
                </Content>

            </Layout>
        </Layout>
    )
}
