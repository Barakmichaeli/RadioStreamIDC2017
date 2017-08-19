/**
 * Created by barak on 18/08/2017.
 */

import 'whatwg-fetch';

export function Signup(e) {

    // console.log(e);
    let username = document.getElementsByClassName('username');
    let email = document.getElementsByClassName('email');
    let pass = document.getElementsByClassName('pass');
    let repass = document.getElementsByClassName('re-pass');

    fetch("http://localhost:8079/register", {
        method: "POST",
        body: JSON.stringify({name : "barak" , password : "123456"}),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(function (response) {
        // response.status     //=> number 100–599
        // response.statusText //=> String
        // response.headers    //=> Headers
        // response.url        //=> String
        // return response.text()
        console.log(response.status)
    }, function (error) {
        // error.message //=> String
    })


}


export function Log(e) {

    let username = document.getElementsByClassName('username');
    let pass = document.getElementsByClassName('pass');
    let flag = false;

    //Check Input validation
    if (username[0].value.length < 4) {
        username[0].style.borderColor = "red";
        flag = true;
    } else {
        username[0].style.borderColor = "white";
    }
    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        flag = true;
    } else {
        pass[0].style.borderColor = "white";
    }

    if (flag)
        return;


    //Call fetch and check if registered
    console.log(e);


}