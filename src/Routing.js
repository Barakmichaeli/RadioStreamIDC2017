import {Route, Redirect} from 'react-router'
import {Switch , Router } from 'react-router-dom'
import history from './components/history';

import React, {Component} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import './App.css'
let loggedIn = false;


export default class Routing extends Component {


    render() {
        return (
            <Router  history={history} >
                {(loggedIn)?
                    <Switch>
                        <Route path="/main"  component={Main}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        {/*handle not found*/}
                        {/*<Redirect exact from="*" to="/Main"/>*/}
                    </Switch>
                    :
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route path="/main" component={Main}/>
                        <Redirect from="*" to="/login"/>
                    </Switch>
                }
            </Router >
        )
    }
}