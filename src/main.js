/**
 * Created by barak on 19/08/2017.
 */
import React , {Component} from 'react';
import {Link} from 'react-router-dom'

class Main extends Component {

    render(){
        return (
            <div className="container-home">
        <header className="upper-menu">
            <table>
                <tr></tr>
                <tr>
                    <td>Favorites</td>
                    <td>Personal area</td>
                    <td>Home</td>
                    <td style={{borderRightColor : "#000000"}}>RadioStream team</td>
                </tr>
            </table>
            {/*<Link to={"/favorites"}> <input className="to-favorites" type="button" value="Favorites"/></Link>*/}
        </header>

            </div>
        )
    }
}

export default Main;