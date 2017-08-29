/**
 * Created by barak on 18/08/2017.
 */

import 'whatwg-fetch';
import history from '../components/history';

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
    let flag = false;


    if (username[0].value.length < 4) {
        document.getElementById("msg").innerHTML = "User name must be at least 4 Characters";
        username[0].style.borderColor = "red";
        username[0].placeholder = 'Enter At Least 4 Characters User Name';
        flag = true;
        return;
    } else {
        username[0].style.borderColor = "white";
        document.getElementById("msg").innerHTML = "";
    }

    if (firstname[0].value.length === 0) {
        firstname[0].style.borderColor = "red";
        firstname[0].placeholder = 'Enter First Name';
        flag = true;
    } else {
        firstname[0].style.borderColor = "white";
    }


    if (lastname[0].value.length === 0) {
        lastname[0].style.borderColor = "red";
        lastname[0].placeholder = 'Enter Last Name';
        flag = true;
    } else {
        lastname[0].style.borderColor = "white";
    }


    if (!validateEmail(email[0].value)) {
        email[0].style.borderColor = "red";
        email[0].placeholder = 'Enter Valid Mail';
        flag = true;
        document.getElementById("msg").innerHTML = "Email is not valid";
        return;
    } else {
        email[0].style.borderColor = "white";
        document.getElementById("msg").innerHTML = "";
    }

    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        pass[0].placeholder = 'Enter At Least 8 Characters Password';
        flag = true;
        document.getElementById("msg").innerHTML = "Password must be at least 8 Characters";
        return;
    } else {
        pass[0].style.borderColor = "white";
        document.getElementById("msg").innerHTML = "";
    }


    if (repass[0].value.length < 8) {
        repass[0].style.borderColor = "red";
        repass[0].placeholder = 'Enter At Least 8 Characters Password';
        flag = true;
    } else {
        repass[0].style.borderColor = "white";
    }

    if (repass[0].value !== pass[0].value) {
        document.getElementById("msg").innerHTML = "Passwords do not match";
        flag = true;
    } else {
        document.getElementById("msg").innerHTML = "";
    }

    if (flag)
        return;

    let self = this;

    fetch("http://localhost:8079/register", {
        method: "POST",
        body: JSON.stringify({
            username: username[0].value, password: pass[0].value, firstName: firstname[0].value,
            lastName: lastname[0].value, email: email[0].value
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(function (response) {

        if (response.status === 200) {
            history.push('/login');
        } else {
            response.json().then(function (res) {
                document.getElementById("msg").innerHTML =
                    res.MSG;
            })
        }

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
        document.getElementById("msg").innerHTML = "Enter a valid user name";
        flag = true;
        return;
    } else {
        username[0].style.borderColor = "white";
        document.getElementById("msg").innerHTML = "";
    }
    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        pass[0].placeholder = 'Enter Password';
        flag = true;
        document.getElementById("msg").innerHTML = "Enter a valid password";
        return;
    } else {
        pass[0].style.borderColor = "white";
        document.getElementById("msg").innerHTML = "";
    }
    if (flag)
        return;

    fetch("http://localhost:8079/login", {
        method: "POST",
        body: JSON.stringify({username: username[0].value, password: pass[0].value}),
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then(function (response) {
        response.json().then(function (user) {
            //Save user data in the browser session
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("first", user.first);
            sessionStorage.setItem("last", user.last);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("favorites", JSON.stringify(user.favorites));

            if (response.status === 200) {
                history.push('/home/stations');
            }
            else {
                document.getElementById("msg").innerHTML = "The password or username is incorrect";
            }
        })
    }, function (error) {
        console.log(error.message);
    });
}


export function updateData(e) {

    // console.log(e);
    let username = document.getElementsByClassName('username');
    let firstname = document.getElementsByClassName('firstname');
    let lastname = document.getElementsByClassName('lastname');
    let email = document.getElementsByClassName('email');
    let pass = document.getElementsByClassName('pass');
    let repass = document.getElementsByClassName('repass');
    let flag = false;

    if (firstname[0].value.length < 4) {
        firstname[0].style.borderColor = "red";
        firstname[0].placeholder = 'Enter First Name';
        flag = true;
    } else
        firstname[0].style.borderColor = "white";

    if (lastname[0].value.length < 4) {
        lastname[0].style.borderColor = "red";
        lastname[0].placeholder = 'Enter Last Name';
        flag = true;
    } else
        lastname[0].style.borderColor = "white";


    if (!validateEmail(email[0].value)) {
        email[0].style.borderColor = "red";
        email[0].placeholder = 'Enter Valid Mail';
        flag = true;
    } else
        email[0].style.borderColor = "white";

    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        flag = true;
    } else
        pass[0].style.borderColor = "white";


    if (repass[0].value.length < 8) {
        repass[0].style.borderColor = "red";
        flag = true;
    } else
        repass[0].style.borderColor = "white";


    if (repass[0].value !== pass[0].value) {
        document.getElementsByClassName("update-message")[0].innerHTML = "Passwords do not match";
        flag = true;
    } else
        document.getElementsByClassName("update-message")[0].innerHTML = "";

    if (flag)
        return;

    //update session
    sessionStorage.setItem("username", username[0].value);
    sessionStorage.setItem("first", firstname[0].value);
    sessionStorage.setItem("last", lastname[0].value);
    sessionStorage.setItem("email", email[0].value);


    //update server
    fetch("http://localhost:8079/update", {
        method: "POST",
        body: JSON.stringify({
            username: username[0].value,
            pass: pass[0].value,
            first: firstname[0].value,
            last: lastname[0].value,
            email: email[0].value
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(function (response) {
        response.json().then(function (res) {
            console.log(response.status);
            if (response.status === 200) {
                document.getElementsByClassName("update-message")[0].innerHTML = "Information Updated :)";
            }
            else {
                document.getElementsByClassName("update-message")[0].innerHTML = "Opps.. something went wrong, please try again later";
            }
        });
    }, function (error) {
        console.log(error);
    })
}


export function checkCookies() {

    fetch("http://localhost:8079/connection/", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then(function (response) {
        response.json().then(function (user) {

            //The user is logged in inside the server
            if (response.status === 200) {
                sessionStorage.setItem("username", user.username);
                sessionStorage.setItem("first", user.first);
                sessionStorage.setItem("last", user.last);
                sessionStorage.setItem("email", user.email);
                sessionStorage.setItem("favorites", JSON.stringify(user.favorites));
                console.log("Im in the server!");
                history.push('/home/stations');
            }

            else(response.status === 500)
            console.log("Not inside the server!");

        })
    }, function (error) {
        console.log(error.message);
    });
}







