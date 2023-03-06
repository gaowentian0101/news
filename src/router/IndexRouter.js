import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../views/login/login'
import Newssandbox from '../views/newssandbox/newssandbox'
export default function IndexRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path="/" render={() => localStorage.getItem("token") ?
                    <Newssandbox></Newssandbox> :
                    <Redirect to="/login" />
                    } />
            </Switch>
        </HashRouter>
    )
}
