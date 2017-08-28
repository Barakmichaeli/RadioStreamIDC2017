import {Route, Redirect} from 'react-router'
import {Switch, Router} from 'react-router-dom'
import history from './components/history';
import React, {Component} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import './App.css'


export default class Routing extends Component {

    constructor(props) {
        super(props);
    }

    isLoggedIn() {
        let self = this;
        if(sessionStorage.length !== 0)
        return true;
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route path="/home" render={() => (this.isLoggedIn() ?
                        <Main/> :
                        <Redirect path="*" to="/login"/> )}/>
                    <Redirect path="*" to="/login"/>
                </Switch>
            </Router >
        )
    }
}