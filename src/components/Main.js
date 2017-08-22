/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';
import MainBar from './MainBar';
import Home from './Home';
import Favorites from './Favorites';
import Personal from './Personal';
import Team from './Team';
import {Router, Route, Redirect, Link} from 'react-router'
import {Switch} from 'react-router-dom'


class Main extends Component {

    render() {
        return (
            <div className="container-home">
                <MainBar/>
                <Switch>
                    <Route exact path="/main" component={Home}/>
                    <Route exact path="/main/favorites" component={Favorites}/>
                    <Route exact path="/main/personal" component={Personal}/>
                    <Route exact path="/main/team" component={Team}/>
                    {/*Error page*/}
                </Switch>
            </div>
        )
    }
}

export default Main;