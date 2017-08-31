import {Route, Redirect} from 'react-router'
import {Switch, Router} from 'react-router-dom'
import history from './components/history';
import React, {Component} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import './styles/App.css'
export default class Routing extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route path="*" render={() => ( (document.cookie.includes("uid=")) ?
                                <Main/>
                            :
                            <Redirect to="/login"/>
                    )}/>
                </Switch>
            </Router >
        )
    }
}