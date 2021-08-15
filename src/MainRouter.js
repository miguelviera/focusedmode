import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Header from './components/core/Header'
import Home from './components/core/Home'
import Profile from './components/user/Profile'
import EditProfile from './components/user/EditProfile'
import Signin from './auth/Signin'
import Signup from './components/user/Signup'
import PrivateRoute from './auth/PrivateRoute'
import Todo from './components/todo/Todo'
import Pomodoro from './components/pomodoro/Pomodoro'
import VerticalBar from './components/pomodoro/VerticalBar'


function MainRouter () {
    return (
        <div className="Home">
            <Header />
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/signin" component={Signin}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/todos" component={Todo}/>
                    <Route exact path="/pomodoros" component={Pomodoro}/>
                    <Route exact path="/stats" component={VerticalBar}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>
                    <PrivateRoute exact path="/profile/edit" component={EditProfile}/>
                </Switch>
            </div>
        </div>
    );
}

export default MainRouter ;