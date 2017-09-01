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

    let username = document.getElementsByClassName('username');
    let firstname = document.getElementsByClassName('firstname');
    let lastname = document.getElementsByClassName('lastname');
    let email = document.getElementsByClassName('email');
    let pass = document.getElementsByClassName('pass');
    let repass = document.getElementsByClassName('re-pass');
    let flag = false;


    //Check input validation
    if (username[0].value.length < 4) {
        username[0].style.borderColor = "red";
        username[0].placeholder = 'Enter User Name';
        flag = true;
    } else {
        username[0].style.borderColor = "white";
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
    } else {
        email[0].style.borderColor = "white";
    }

    if (pass[0].value.length < 8) {
        pass[0].style.borderColor = "red";
        pass[0].placeholder = 'Enter Valid Password';
        flag = true;
    } else {
        pass[0].style.borderColor = "white";
    }


    if (repass[0].value.length < 8) {
        repass[0].style.borderColor = "red";
        repass[0].placeholder = 'Password again';
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


    fetch("api/register", {
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
        console.log(error.message);
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

    fetch("api/login", {
        method: "POST",
        body: JSON.stringify({username: username[0].value, password: pass[0].value}),
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then(function (response) {
        response.json().then(function (user) {

            if (response.status === 200) {
                //Save user data in the browser session
                sessionStorage.setItem("username", user.username);
                sessionStorage.setItem("first", user.first);
                sessionStorage.setItem("last", user.last);
                sessionStorage.setItem("email", user.email);
                sessionStorage.setItem("favorites", JSON.stringify(user.favorites));
                history.push('/home/stations');
            }
            else {
                document.getElementById("msg").innerHTML = "Invalid username or password";
            }
        })
    }, function (error) {
        console.log(error.message);
    });
}


export function updateData(e) {

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

    //update current sessionStorage
    sessionStorage.setItem("username", username[0].value);
    sessionStorage.setItem("first", firstname[0].value);
    sessionStorage.setItem("last", lastname[0].value);
    sessionStorage.setItem("email", email[0].value);


    //update the server
    fetch("api/update", {
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

export function removeUser() {

    fetch("api/remove", {
        method: "POST",
        body: JSON.stringify({username: sessionStorage.getItem("username")}),
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then(function (response) {
        //Clear cookies and the current browser tab session
        console.log(response.status);
        sessionStorage.clear();
        document.cookie = 'uid=; Max-Age=0';
    }, function (error) {
        console.log(error.message);
    });

    history.push('/login');
}





