/**
 * Created by barak on 18/08/2017.
 */


export function Signup(e) {

    console.log(e);
    let username = document.getElementsByClassName('username');
    let email = document.getElementsByClassName('email');
    let pass = document.getElementsByClassName('pass');
    let repass = document.getElementsByClassName('re-pass');


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