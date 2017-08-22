/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';
import ListItem from './ListItem';
import stations from './stationsUrls';

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentStation: ["", ""]
        }
    }


    generateList() {
        let arr = [];
        for (let i = 0; i < stations.length; i++)
            arr.push(<ListItem setStation={this.setStation.bind(this)}
                               station={stations[i]}/>);
        return arr;
    }

    setStation(station) {
        this.setState({
            currentStation: station
        });
    }

    componentDidUpdate() {
        this.refs.audio.load();
    }


    render() {
        console.log("OK");
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