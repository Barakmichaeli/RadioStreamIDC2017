import {Route, Redirect} from 'react-router'
import {Switch, Router} from 'react-router-dom'
import history from './components/history';
import React, {Component} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import './styles/App.css'
import {fetchData} from './clientApi/LoginRegisterApi';

export default class Routing extends Component {


    render() {
        console.log("here");
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route path="*" render={() => ( (sessionStorage.length !== 0) ?
                            <Main/> :
                            <div>
                                {fetchData()}
                                <Redirect to="/login"/>
                            </div>
                    )}/>
                </Switch>
            </Router >
        )
    }
}