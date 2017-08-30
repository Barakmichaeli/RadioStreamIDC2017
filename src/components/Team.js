import React, {Component} from 'react';

export  default class Team extends Component {


    render() {
        return (
            <div className="team">

                <div  style={{float : "left" , marginLeft : "15%" , marginTop : "15.5%"}} className="home-title">
                    <h1>Barak Michaeli</h1>
                    <h2>Barak6546@gmail.com</h2>
                    <h2>CEO RadioStream</h2>
                </div>

                <div  style={{float : "right" , marginTop : "19%" , marginRight : "3%"}} className="home-title alon">
                    <h1>Alon Weiner</h1>
                    <h2>alon7771@gmail.com</h2>
                    <h2>Fullstack developer in RadioStream</h2>
                </div>


                <div  style={{float : "left" ,  marginRight : "2%"  , marginLeft : "27%" , marginBottom : "4%" , marginTop : "12%"}} className="home-title noam">
                    <h1>Noam Meirovich</h1>
                    <h2>noamm91@gmail.com</h2>
                    <h2>Fullstack Senior in RadioStream</h2>
                </div>
            </div>
        )
    }
}
