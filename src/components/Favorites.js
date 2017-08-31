import React, {Component} from 'react';
import ListItem from './ListItem';
import stations from './stationsUrls';

class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStation: ["", ""],
        }
    }


    generateList() {

        let arr = [];

        //the favorites from the server
        let favorites = JSON.parse(sessionStorage.getItem("favorites"));
        favorites = stations.filter((station) => {
            return favorites.includes(station[1]);
        });

        for (let i = 0; i < favorites.length; i++)
            arr.push(<ListItem playStation={this.playStation.bind(this)}
                               favorite={true}
                               currentStation={this.state.currentStation}
                               mode={"Favorites"}
                               station={favorites[i]}/>);
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
            <div id="favorites" className="main-block favorites">
                <div className="home-title fav">
                    <h1>Favorites</h1>
                    <h2>What is your favorite station?</h2>
                    <h2>Let the music control. </h2>

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

export default Favorites;