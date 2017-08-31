import React, {Component} from 'react';
import MainBar from './MainBar';
import Home from './Home';
import Favorites from './Favorites';
import Personal from './Personal';
import Team from './Team';
import LoadData from './LoadData';
import {Router, Route, Redirect} from 'react-router'
import {Switch} from 'react-router-dom'


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.fetchData.bind(this);
    }

    fetchData() {
        let self = this;
        fetch("api/connection", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(function (response) {
            response.json().then(function (user) {
                if (response.status === 200) {
                    sessionStorage.setItem("username", user.username);
                    sessionStorage.setItem("first", user.first);
                    sessionStorage.setItem("last", user.last);
                    sessionStorage.setItem("email", user.email);
                    sessionStorage.setItem("favorites", JSON.stringify(user.favorites));
                    self.setState({
                        data: true
                    });
                }
                else {
                    history.push('/login');
                }
            })
        }, function (error) {
            console.log(error.message)
        })
    }

    render() {
        return (
            <div className="container-home">
                {sessionStorage.getItem("username") ?
                    <div>
                        <MainBar/>
                        <Switch>
                            <Route exact path="/stations" component={Home}/>
                            <Route exact path="/favorites" component={Favorites}/>
                            <Route exact path="/personal" component={Personal}/>
                            <Route exact path="/team" component={Team}/>
                            <Redirect path="*" to="/stations"/>
                        </Switch>
                    </div>
                    :
                    <div>
                        {this.fetchData()}
                        <LoadData/>
                    </div>
                }
            </div>
        )
    }
}

export default Main;