import React, {Component} from 'react';
import ListItem from './ListItem';
import stations from './stationsUrls';
import {getFavorites} from '../clientApi/LoginRegisterApi';

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentStation: ["", ""]
        }
    }

    generateList() {

        let arr = [];
        let favorites = sessionStorage.getItem("favorites");

        //generate list
        for (let i = 0; i < stations.length; i++){
            let status = (favorites.includes(stations[i][1]));
            arr.push(<ListItem playStation={this.playStation.bind(this)}
                               favorite={status}
                               currentStation={this.state.currentStation}
                               mode={"Home"}
                               station={stations[i]}
                               key = {stations[i][1]} />);
        }
        return arr;
    }

    playStation(station) {
        this.setState({
            currentStation: station
        });
    }

    componentDidUpdate() {
        this.refs.audio.load();
    }

    render() {
        return (
            <div id="home" className="main-block home">

                <div className="home-title">
                    <h1>RadioStream</h1>
                    <h2>Changing the world of radio.</h2>
                    <h2>Play. Control. Repeat.</h2>
                    <h3>Choose your station.</h3>

                    <audio autoPlay controls className="player" ref="audio">
                        <source src={this.state.currentStation[0]}/>
                    </audio>
                </div>

                <div className="stations-list">
                    <ul>
                        {this.generateList()}
                    </ul>
                </div>

            </div>
        )
    }
}

export default Home;