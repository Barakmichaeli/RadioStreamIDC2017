import React, {Component} from 'react';

export  default class Team extends Component {

    render() {
        return (
            <div className="team">

                <div style={{float: "left", marginLeft: "15%", marginTop: "12%"}} className="home-title barak">
                    <h1>Alon Weiner</h1>
                    <h2>alon7771@gmail.com</h2>
                </div>

                <div style={{float: "right", marginTop: "19%", marginRight: "15%"}} className="home-title alon">
                    <h1>Barak Michaeli</h1>
                    <h2>Barak6546@gmail.com</h2>
                </div>


                <div style={{marginRight: "30%", marginTop: "8%"}} className="home-title noam">
                    <h1>Noam Meirovich</h1>
                    <h2>noamm91@gmail.com</h2>
                </div>
            </div>
        )
    }
}
