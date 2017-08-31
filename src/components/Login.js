import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Log} from '../clientApi/LoginRegisterApi';


class Login extends Component {

    render() {
        return (
            <div className="login-container container">
                <div className="login-header">
                    <h1><u>RadioStream Login</u></h1>
                    <br/>
                </div>
                <div className="login-form">
                    {/*<h3>Username:</h3>*/}
                    <input type="text" className="username" placeholder="What's your username?"/>
                    <br/> <br/>
                    {/*<h3>Password:</h3>*/}
                    <input className="pass" type="password" placeholder="What's your password?"/>
                    <br/><br/>
                    <h5 id="msg"> </h5>
                    <br/>
                    <button className="log" onClick={ (e) => {
                        Log(e);
                    }}> Login
                    </button>
                    <br/>

                    <Link to={"/register"}><input type="button" value="Signup"/></Link>
                    <br/> <br/>

                </div>
            </div>
        )
    }
}

export default Login;
