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
                    <input className="username" type="text" placeholder="Username"/>
                    <br/> <br/>
                    <input className="firstname" type="text" placeholder="First Name"/>
                    <br/> <br/>
                    <input className="lastname" type="text" placeholder="Last Name"/>
                    <br/> <br/>
                    <input className="email" type="email" placeholder="Email"/>
                    <br/> <br/>
                    <input className="pass" type="password" placeholder="Password - Eight valid characters "/>
                    <br/> <br/>
                    <input className="re-pass" type="password"
                           placeholder="Repassword - Eight valid characters  "/>
                    <br/>
                    <br/>
                    <label className="genderBox"> <input id="male"
                                                         style={{width: "20px", height: "15px", marginBottom: "0px"}}
                                                         name="gender" type="radio" value="Male"/> Male </label>
                    <label className="genderBox"> <input id="female"
                                                         style={{width: "20px", height: "15px", marginBottom: "0px"}}
                                                         name="gender" type="radio" value="Female"/> Female </label>
                    <br/>
                    <h5 id="msg"> </h5>
                    <button onClick={ (e) => {
                        Signup(e);
                    }}> Signup
                    </button>
                    <br/>
                    <Link to={"/login"}> <input type="button" value="Login" className="register-button"/></Link>
                </div>
            </div>
        )
    }
}

export default Register;
