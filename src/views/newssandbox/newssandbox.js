import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import "./newssandbox.css"
import SideMenu from '../../components/sandBox/SideMenu'
import TopNav from '../../components/sandBox/TopNav'
import Home from './home/Home'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
import Notfound from "./notfound/Notfound"
import Add from "./news-mange/Add"
import { Layout } from 'antd';
import Draft from "./news-mange/Draft"
import Category from "./news-mange/Category"
import Aduit from "./aduit-mange/Aduit"
import AduitList from "./aduit-mange/AduitList"
import Unpublished from "./publish-mange/Unpublished"
import Published from "./publish-mange/Published"
import Sunset from "./publish-mange/Sunset"
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
                        <Route path='/news-manage/add' component={Add}></Route>
                        <Route path='/news-manage/draft' component={Draft}></Route>
                        <Route path='/news-manage/category' component={Category}></Route>
                        <Route path='/audit-manage/audit' component={Aduit}></Route>
                        <Route path='/audit-manage/list' component={AduitList}></Route>
                        <Route path='/publish-manage/unpublished' component={Unpublished}></Route>
                        <Route path='/publish-manage/published' component={Published}></Route>
                        <Route path='/publish-manage/sunset' component={Sunset}></Route>

                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route path='*' component={Notfound}></Route>
                    </Switch>
                </Content>

            </Layout>
        </Layout>
    )
}
