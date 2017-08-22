/**
 * Created by barak on 19/08/2017.
 */
import React, {Component} from 'react';
import Favorites from './Favorites';
import {Router, Route, Redirect} from 'react-router'


var smoothScroll = {
    timer: null,
    stop: function () {
        clearTimeout(this.timer);
    },

    scrollTo: function (id, callback) {
        var settings = {
            duration: 450,
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


class Main extends Component {


    render() {
        return (
            <div className="container-home">
                <header className="upper-menu">
                    <div className="icon">
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <td>Your Personal area</td>
                            <td>
                                Favorites
                            </td>
                            <td onClick={() => {
                                smoothScroll.scrollTo('home');
                            }}>
                                Home
                            </td>

                            <td style={{borderRightColor: "#000000"}} onClick={ () => {
                                smoothScroll.scrollTo('team');
                            }}>
                                RadioStream team
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/*<Link to={"/favorites"}> <input className="to-favorites" type="button" value="Favorites"/></Link>*/}
                </header>

                <Route path="/favorites" component={Favorites}/>

                

                {/*<div id="home" className="main-block home">*/}
                {/*</div>*/}

                {/*/!*<Favorites/>*!/*/}

                {/*<div id="team" className="main-block team">*/}
                    {/*The team*/}
                {/*</div>*/}

            </div>
        )
    }
}

export default Main;