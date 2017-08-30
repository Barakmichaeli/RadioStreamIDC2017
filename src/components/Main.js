import React, {Component} from 'react';
import MainBar from './MainBar';
import Home from './Home';
import Favorites from './Favorites';
import Personal from './Personal';
import Team from './Team';
import {Router, Route, Redirect} from 'react-router'
import {Switch} from 'react-router-dom'


class Main extends Component {

    render() {
        return (
            <div className="container-home">
                <MainBar/>
                <Switch>
                    <Route exact path="/stations" component={Home}/>
                    <Route exact path="/favorites" component={Favorites}/>
                    <Route exact path="/personal" component={Personal}/>
                    <Route exact path="/team" component={Team}/>
                    <Redirect path="*" to="/stations"/>
                </Switch>
            </div>
        )
    }
}

export default Main;