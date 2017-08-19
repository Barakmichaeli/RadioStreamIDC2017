import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Log} from './clientApi/LoginRegisterApi';
import './App.css'


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="login-header">
                    <h1>RadioStream Login</h1>
                    <br/>
                </div>
                <div className="login-form">
                    <h3>Username:</h3>
                    <input type="text" className="username" placeholder="Username"/>
                    <br/> <br/>
                    <h3>Password:</h3>
                    <input className="pass form-control" type="password" placeholder="Your Password #########"/>
                    <br/> <br/>
                    <button  onClick={ (e) =>{
                        Log(e);
                    }}> Login
                    </button>
                    <br/>
                    <Link to={"/register"}><input type="button" value="Signup!"/></Link>
                </div>
            </div>
        )
    }
}

export default Login;
