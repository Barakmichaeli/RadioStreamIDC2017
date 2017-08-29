import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router'
import {Link} from 'react-router-dom'

class MainBar extends Component {

    setColor(item) {
        document.getElementById(item).style.borderBottom = "3px solid #fff8eb";
        let arr = ["personal", "home", "team", "favorites"];
        let index = arr.indexOf(item);
        arr.splice(index, 1);
        document.getElementById(arr[0]).style.borderBottom = "";
        document.getElementById(arr[1]).style.borderBottom = "";
        document.getElementById(arr[2]).style.borderBottom = "";
    }

    logout() {
        fetch("http://localhost:8079/logout", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(function (response) {
        }, function (error) {
            console.log(error.message);
        })
    }

    render() {
        return (
            <header className="upper-menu">
                <div className="icon">
                </div>
                <table>
                    <tbody>
                    <tr>
                        <Link to="/login" onClick={() => {
                            sessionStorage.clear();
                            this.logout();
                        }}>
                            <td id="logout">
                                Logout
                            </td>
                        </Link>

                        <Link to="/home/personal" onClick={() => {
                            this.setColor("personal");
                        }}>
                            <td id="personal">
                                Your Personal area
                            </td>
                        </Link>


                        <Link to="/home/favorites" onClick={(e) => {
                            this.setColor("favorites");
                        }}>
                            <td id="favorites">
                                Favorites
                            </td>
                        </Link>


                        <Link to="/home/stations" onClick={() => {
                            this.setColor("home");
                        }}>
                            <td id="home">
                                Home
                            </td>
                        </Link>

                        <Link to="/home/team" onClick={() => {
                            this.setColor("team");
                        }}>
                            <td id="team" style={{borderRightColor: "#000000"}}>
                                RadioStream team
                            </td>
                        </Link>
                    </tr>
                    </tbody>
                </table>
            </header>
        )
    }
}

export default MainBar;