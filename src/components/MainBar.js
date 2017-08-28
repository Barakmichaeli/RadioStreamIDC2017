/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';
// import Favorites from './Favorites';
import {Router, Route, Redirect} from 'react-router'
import {Link} from 'react-router-dom'


var smoothScroll = {
    timer: null,
    stop: function () {
        clearTimeout(this.timer);
    },

    scrollTo: function (id, callback) {
        var settings = {
            duration: 500,
            easing: {
                outQuint: function (x, t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                }
            }
        };

        var percentage;
        var startTime;
        var node = document.getElementById(id);
        var nodeTop = node.offsetTop;
        var nodeHeight = node.offsetHeight;
        var body = document.body;
        var html = document.documentElement;
        var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        var windowHeight = window.innerHeight
        var offset = window.pageYOffset;
        var delta = nodeTop - offset;
        var bottomScrollableY = height - windowHeight;
        var targetY = (bottomScrollableY < delta) ?
            bottomScrollableY - (height - nodeTop - nodeHeight + offset) :
            delta;

        startTime = Date.now();
        percentage = 0;

        if (this.timer) {
            clearInterval(this.timer);
        }

        function step() {
            var yScroll;
            var elapsed = Date.now() - startTime;

            if (elapsed > settings.duration) {
                clearTimeout(this.timer);
            }

            percentage = elapsed / settings.duration;

            if (percentage > 1) {
                clearTimeout(this.timer);

                if (callback) {
                    callback();
                }
            } else {
                yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
                window.scrollTo(0, yScroll);
                this.timer = setTimeout(step, 10);
            }
        }

        this.timer = setTimeout(step, 10);
    }
};


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


    render() {
        return (
            <header className="upper-menu">
                <div className="icon">
                </div>
                logout

                <table>
                    <tbody>
                    <tr>
                        <Link to="/login" onClick={() => {
                            sessionStorage.clear();
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