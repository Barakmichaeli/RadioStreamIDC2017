/**
 * Created by barak on 14/08/2017.
 */
import {Router, Route, Redirect} from 'react-router'
import {BrowserRouter, Switch} from 'react-router-dom'
import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';
import {isLoggedIn} from './ServerApi'


export default class Routing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        isLoggedIn();
        return (
            <BrowserRouter>
                <Switch>
                    < Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Redirect exact from="*" to="/login"/>
                </Switch>
            </BrowserRouter>
        )
    }
}