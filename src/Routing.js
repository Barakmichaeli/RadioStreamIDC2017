/**
 * Created by barak on 14/08/2017.
 */
import {Router, Route, Redirect} from 'react-router'
import {BrowserRouter, Switch} from 'react-router-dom'
import React, {Component} from 'react';
import Login from './components/Login';
import Register from './components/Register';
// import {isLoggedIn} from './ServerApi'
import Main from './components/Main';
import './App.css'


export default class Routing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render() {
        console.log("In routing");
        return (
            <BrowserRouter>
                {(this.state.loggedIn) ?
                    <Switch>
                        <Route path="/main" component={Main}/>
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
            </BrowserRouter>
        )
    }
}