/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';
import ListItem from './ListItem';
import stations from './stationsUrls';


class Favorites extends Component {

    constructor(props) {
        super(props);
        //Get favorites from session
        this.state = {
            currentStation: ["", ""],
        }
    }


    generateList() {

        let arr = [];
        //Get the favorites from server!




        for (let i = 0; i < stations.length; i++)
            arr.push(<ListItem playStation={this.playStation.bind(this)}
                               favorite={true}
                               currentStation = {this.state.currentStation}
                               updateFavorites={this.updateFavorites(this)}
                               mode={"Favorites"}
                               station={stations[i]}/>);
        return arr;
    }

    updateFavorites() {

        //update Server!
        //+ Re render
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
                <div className="home-title">
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