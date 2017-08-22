/**
 * Created by barak on 20/08/2017.
 */
import React, {Component} from 'react';
import {updateData} from  '../clientApi/LoginRegisterApi'

export  default class Personal extends Component {

    render() {
        return (
            <div className="personal">


                <div className="home-title">
                    <h1>Privacy</h1>
                    <h2>We are Obligated for safety.</h2>
                </div>


                <div className="update-form">
                    <h3>Username:</h3>
                    <input className="username" type="text" placeholder="Username"/>
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
                    <input className="pass" type="password" placeholder="Eight valid characters "/>
                    <br/> <br/>
                    <h3>Retype password:</h3>
                    <input className="re-pass" type="password" placeholder="Password again"/>
                    <br/> <br/>
                    <button onClick={ (e) => {
                        updateData(e);
                    }}> Update information
                    </button>

                </div>
            </div>
        )
    }
}
