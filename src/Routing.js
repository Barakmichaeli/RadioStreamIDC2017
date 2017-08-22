/**
 * Created by barak on 14/08/2017.
 */
import {Router, Route, Redirect} from 'react-router'
import {BrowserRouter, Switch} from 'react-router-dom'
import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';
import {isLoggedIn} from '../ServerApi'
import Main from './Main';
import '../App.css'


export default class Routing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                {(this.state.loggedIn) ?
                    <Switch>
                        <Route path="/main" component={Main}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Redirect exact from="*" to="/Main"/>
                    </Switch>
                    :
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        {/*comment on next line !!*/}
                        <Route path="/main" component={Main}/>
                        <Redirect exact from="*" to="/login"/>
                    </Switch>
                }
            </BrowserRouter>
        )
        isLoggedIn();
    }
}