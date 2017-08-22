/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';


class ListItem extends Component {

    render() {

        let station = this.props.station;
        return (
            <div className="station-item" style={{textAlign: "center"}}>

                <p style={{marginTop: "1px", display: "inline", fontSize: "x-large", cursor: "pointer"}}
                   onClick={() => {
                       this.props.setStation(station);
                   }}>
                    {station[1]}</p>

                <img src={require('./../images/emptyStar.png')} alt="favorite"
                     style={{width: "35px", height: "35px", display: "inline", float: "right", cursor: "pointer"}}/>

                <a href={station[2]} target="_blank">
                    <img src={require('./../images/home.png')} alt="Move to the station website"
                         style={{
                             marginRight: "13px",
                             width: "35px",
                             height: "35px",
                             display: "inline",
                             float: "right",
                             cursor: "pointer"
                         }}/>
                </a>
            </div>
        )
    }
}

export default ListItem;