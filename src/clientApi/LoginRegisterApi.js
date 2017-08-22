/**
 * Created by barak on 18/08/2017.
 */

import 'whatwg-fetch';

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export function Signup(e) {

    // console.log(e);
    let username = document.getElementsByClassName('username');
    let firstname = document.getElementsByClassName('firstname');
    let lastname = document.getElementsByClassName('lastname');
    let email = document.getElementsByClassName('email');
    let pass = document.getElementsByClassName('pass');
    let repass = document.getElementsByClassName('re-pass');

    if (username[0].value.length < 4) {
        username[0].style.borderColor = "red";
        username[0].placeholder = 'Enter User Name';
    } else {
        username[0].style.borderColor = "white";
    }
    if (firstname[0].value.length < 4) {
        firstname[0].style.borderColor = "red";
        firstname[0].placeholder = 'Enter First Name';
    } else {
        firstname[0].style.borderColor = "white";
    }
    if (lastname[0].value.length < 4) {
        lastname[0].style.borderColor = "red";
        lastname[0].placeholder = 'Enter Last Name';
    } else {
        lastname[0].style.borderColor = "white";
    }
    if (!validateEmail(email[0].value)) {
        email[0].style.borderColor = "red";
        email[0].placeholder = 'Enter Valid Mail';
    } else {
        email[0].style.borderColor = "white";
    }
    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        pass[0].placeholder = 'Enter Password';
    } else {
        pass[0].style.borderColor = "white";
    }
    if (repass[0].value.length < 8) {
        repass[0].style.borderColor = "red";
        repass[0].placeholder = 'Enter Password';
    } else {
        repass[0].style.borderColor = "white";
    }



    fetch("http://localhost:8079/register", {
        method: "POST",
        body: JSON.stringify({name : "barak" ,
            password : "123456"}),
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
        username[0].placeholder = 'Enter User Name';
        flag = true;
    } else {
        username[0].style.borderColor = "white";
    }
    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        pass[0].placeholder = 'Enter Password';
        flag = true;
    } else {
        pass[0].style.borderColor = "white";
    }

    if (flag)
        return;


    //Call fetch and check if registered
    console.log(e);


}