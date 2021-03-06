import React, {Component} from 'react';
import 'whatwg-fetch';


class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: this.props.favorite,
            station: this.props.station
        }
    }


    addFavorite() {

        let self = this;
        let username = sessionStorage.getItem("username");
        let station = this.state.station[1];

        //Add to the session also
        let favorites = JSON.parse(sessionStorage.getItem("favorites"));
        favorites.push(station);
        sessionStorage.setItem("favorites", JSON.stringify(favorites));

        //update  in server
        fetch("/api/addFavorite", {
            method: "POST",
            body: JSON.stringify({station: station, username: username}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then((response) => {
                response.json().then(function (res) {
                    //In home don't remove stars just display empty star
                    self.setState({
                        favorite: !self.state.favorite
                    });
                })
            }
            , function (error) {
                console.log("Error" + error.message);
            });
    }

    removeFavorite(mode) {

        let username = sessionStorage.getItem("username");
        let station = this.state.station[1];

        //Update the sessionStorage data
        let favorites = JSON.parse(sessionStorage.getItem("favorites"));
        let index = favorites.indexOf(station);
        favorites.splice(index, 1);
        sessionStorage.setItem("favorites", JSON.stringify(favorites));

        //update favorites in server
        let self = this;
        fetch("/api/removeFavorite", {
            method: "POST",
            body: JSON.stringify({station: station, username: username}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then((response) => {
                response.json().then(function (res) {
                    //In home don't remove stars just display empty star
                    if (mode === "Home")
                        self.setState({
                            favorite: !self.state.favorite
                        });
                    else {
                        let player = document.getElementsByClassName('player');
                        document.getElementById(self.state.station + "Box").style.display = "none";
                        if (self.props.currentStation[1] === self.state.station[1]) {
                            player[0].pause();
                        }
                    }
                })
            }
            , function (error) {
                console.log("Error" + error.message);
            });
    }

    render() {

        let station = this.state.station;
        return (
            <div id={station + "Box"} className="station-item"
                 style={{textAlign: "center"}}>

                {(this.props.currentStation[1] === station[1]) ?
                    <img id={station} src={require('./../images/play.png')}
                         style={{height: "35px", width: "35px", float: "left", display: 'inline-block'}}/>
                    :
                    ""}

                <p style={{marginTop: "1px", display: "inline", fontSize: "x-large", cursor: "pointer"}}
                   onClick={() => {
                       this.props.playStation(station);
                   }}>
                    {station[1]}</p>

                {(!this.state.favorite) ?
                    <img id={station}
                         src={require('./../images/emptyStar.png')} alt="not favorite"
                         style={{width: "35px", height: "35px", display: "inline", float: "right", cursor: "pointer"}}
                         onClick={() => {
                             //Favorite mode
                             if (!this.props.mode === "Favorite") {
                                 this.removeFavorite(this.props.mode);
                             } else {
                                 //Home mode
                                 if (!this.state.favorite)
                                     this.addFavorite();
                                 else
                                     this.removeFavorite(this.props.mode);
                             }
                         }}
                    />
                    :
                    <img id={station}
                         src={require('./../images/star.png')}
                         alt="favorite"
                         style={{width: "35px", height: "35px", display: "inline", float: "right", cursor: "pointer"}}
                         onClick={() => {
                             //Favorite mode - we can only remove station from list
                             if (!this.props.mode === "Favorite") {
                                 this.removeFavorite(this.props.mode);
                             } else {
                                 //Home mode - we can add or remove from favorites
                                 if (!this.state.favorite)
                                     this.addFavorite();
                                 else
                                     this.removeFavorite(this.props.mode);
                             }
                         }}
                    />
                }

                <a href={station[2]} target="_blank">
                    <img src={require('./../images/home.png')} alt="Move to the station website"
                         style={{
                             marginRight: "8px",
                             width: "35px",
                             height: "35px",
                             display: "inline",
                             float: "right",
                             cursor: "pointer"
                         }}
                    />
                </a>
            </div>
        )
    }
}

export default ListItem;