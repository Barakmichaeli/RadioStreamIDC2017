/**
 * Created by barak on 20/08/2017.
 */
import React, {Component} from 'react';
import {updateData} from  '../clientApi/LoginRegisterApi'

export  default class Personal extends Component {


    constructor(props) {

        super(props);
        this.state = {
            username: "Barak",
            firstname: "Barak",
            lastname: "Michaeli",
            email: "barak6546@gmail.com"
        }
        this.updateInput.bind(this);
    }


    updateInput(e) {
        console.log(e.target.className);
        this.setState({
            [e.target.className]: e.target.value
        });
    }

    render() {
        return (
            <div className="personal">

                <div className="home-title">
                    <h1>Privacy</h1>
                    <h2>We are Obligated for safety.</h2>
                </div>


                <div id="updateForm" className="update-form">
                    <h3>Username:</h3>
                    <input className="username" type="text" placeholder="Username"
                           value={this.state.username}
                    />
                    <br/> <br/>
                    <h3>First Name:</h3>
                    <input className="firstname" type="text" placeholder="First Name"
                           value={this.state.firstname}
                           onChange={(e) => {
                               this.updateInput(e);
                           }}/>
                    <br/> <br/>
                    <h3>Last Name:</h3>
                    <input className="lastname" type="text" placeholder="Last Name"
                           value={this.state.lastname}
                           onChange={(e)=>{
                               this.updateInput(e);
                           }}/>
                    <br/> <br/>
                    <h3>Email:</h3>
                    <input className="email" type="email" placeholder="Email"
                           value={this.state.email}
                           onChange={(e)=>{
                               this.updateInput(e);
                           }}/>
                    <br/> <br/>
                    <h3>Password:</h3>
                    <input className="pass" type="password" placeholder="New Password"/>
                    <br/> <br/>

                    <h3>Retype password:</h3>
                    <input className="repass" type="password" placeholder="Password again"/>
                    <br/> <br/>
                    <button onClick={ (e) => {
                        updateData(e);
                    }}> Update information
                    </button>
                    <br/>
                    <br/>
                    <h3 className="update-message">  </h3>
                </div>
            </div>
        )
    }
}
