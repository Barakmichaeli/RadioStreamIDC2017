/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';
import MainBar from './MainBar';
import Home from './Home';
import Favorites from './Favorites';
import Personal from './Personal';
import Team from './Team';
import {Router, Route , Redirect} from 'react-router'
import {Switch} from 'react-router-dom'


class Main extends Component {

    render() {
        return (
            <div className="container-home">
                <MainBar/>
                <Switch>
                    <Route exact path="/home/stations" component={Home}/>
                    <Route exact path="/home/favorites" component={Favorites}/>
                    <Route exact path="/home/personal" component={Personal}/>
                    <Route exact path="/home/team" component={Team}/>
                    <Redirect path="/home" to="/home/stations"/>
                </Switch>
            </div>
        )
    }
}

export default Main;