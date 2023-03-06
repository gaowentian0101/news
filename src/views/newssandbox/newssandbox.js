import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../components/sandBox/sideMenu'
import TopNav from '../../components/sandBox/topNav'
import Home from './home/Home'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
import Notfound from "./notfound/Notfound"
export default function newssandbox() {
    return (
        <div>
            {/* 侧边栏 */}
            <SideMenu></SideMenu>
            {/* 导航栏 */}
            <TopNav></TopNav>
            <Switch>
                <Route path='/home' component={Home}></Route>
                <Route path='/user-manage/list' component={UserList}></Route>
                <Route path='/right-manage/role/list' component={RoleList}></Route>
                <Route path='/right-manage/right/list' component={RightList}></Route>
                <Redirect from='/' to='/home' exact></Redirect>
                <Route path='*' component={Notfound}></Route>

            </Switch>

        </div>
    )
}
