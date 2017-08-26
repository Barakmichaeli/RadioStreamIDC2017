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
    let flag = false;


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
        pass[0].placeholder = 'Enter Password';
        flag = true;
    } else {
        pass[0].style.borderColor = "white";
    }


    if (repass[0].value.length < 8) {
        repass[0].style.borderColor = "red";
        repass[0].placeholder = 'Enter Password';
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
        console.log(response.status);


        if (response.status === 200) {
            //Just back to login
            console.log("here!!!!");
            self.context.router.push('/login');

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

    fetch("http://localhost:8079/login", {
        method: "POST",
        body: JSON.stringify({username: username[0].value, password: pass[0].value}),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(function (response) {
        if (response.status === 200)
            console.log("Log in!!");
        else
            console.log("Cant find the user..");

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
    } else {
        firstname[0].style.borderColor = "white";
    }
    if (lastname[0].value.length < 4) {
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
        flag = true;
    } else {
        pass[0].style.borderColor = "white";
    }

    if (repass[0].value.length < 8) {
        repass[0].style.borderColor = "red";
        flag = true;
    } else {
        repass[0].style.borderColor = "white";
    }

    if (repass[0].value !== pass[0].value) {
        document.getElementsByClassName("update-message")[0].innerHTML = "Passwords do not match";
        flag = true;
    } else {
        document.getElementsByClassName("update-message")[0].innerHTML = "";
    }
    if (flag)
        return;

    fetch("http://localhost:8079/update", {
        method: "POST",
        body: JSON.stringify({
            userName: username[0].value,
            password: pass[0].value,
            firstName: firstname[0].value,
            lastName: lastname[0].value,
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
            // response.status     //=> number 100–599
            // response.statusText //=> String
            // response.headers    //=> Headers
            // response.url        //=> String
            // return response.text()
        });
    }, function (error) {
        console.log(error);
        // error.message //=> String
    })
}







