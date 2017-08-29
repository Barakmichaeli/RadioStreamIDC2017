/**
 * Created by barak on 14/08/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Signup} from '../clientApi/LoginRegisterApi';

class Register extends Component {
    render() {
        return (
            
            <div className="register-container container">
                <div className="login-header">
                    <h1><u>RadioStream Register</u></h1>
                    <br/>
                </div>
                <div className="login-form">
                    <h3>Username:</h3>
                    <input className="username" type="text" placeholder="Enter At Least 4 Characters User Name"/>
                    <br/> <br/>
                    <h3>First Name:</h3>
                    <input className="firstname" type="text" placeholder="First Name"/>
                    <br/> <br/>
                    <h3>Last Name:</h3>
                    <input className="lastname" type="text" placeholder="Last Name"/>
                    <br/> <br/>
                    <h3>Email:</h3>
                    <input className="email" type="email" placeholder="Email"/>
                    <br/> <br/>
                    <h3>Password:</h3>
                    <input className="pass" type="password" placeholder="Enter At Least 8 Characters Password "/>
                    <br/> <br/>
                    <h3>Retype password:</h3>
                    <input className="re-pass" type="password" placeholder="Enter At Least 8 Characters Password "/>
                    <br/>

                    <h5 id="msg"> </h5>

                    <button onClick={ (e) => {
                        Signup(e);
                    }}> Sign me up!
                    </button>
                    <br/>
                    <Link to={"/login"}> <input type="button" value="Go to Login" className="register-button"/></Link>
                </div>
            </div>
        )
    }
}

export default Register;
