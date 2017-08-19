/**
 * Created by barak on 18/08/2017.
 */


module.exports = (PORT) => {

    let express = require("express");
    const app = express();
    var bodyParser = require('body-parser');
    var fs = require('fs');


    app.listen(PORT, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Backend is up! on " + PORT);
    });

    // Allowing access to our main api server
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    let usersFile = './usersList.json';

    function authenticationRegister(userName, callback) {
        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send("Opps, Something went wrong..");
            }
            //Convert the JSON file to apropriate format
            if (data.length !== 0) {
                var text = data.replace(/}{/g, "},{").replace(/^{/, "[{") + "]";
                //Convert the array json to js array
                var obj = JSON.parse(text);
                for (i in obj) {
                    if (obj[i].userName === userName) {
                        callback(false);
                        return;
                    }
                }
            }
            callback(true);
        });
    }

    function authenticationLogin(userName, pass, callback) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send("Opps, Something went wrong..");
            }

            if (data.length != 0) {
                var x = data.replace(/}{/g, "},{").replace(/^{/, "[{") + "]";
                x = JSON.parse(x);
                for (i in x) {
                    if (x[i].userName === userName && x[i].password == pass) {
                        callback(true);
                        return;
                    }
                }
            }
            callback(false);
        });
    }

    function configureLists() {
        fs.appendFile(usersFile, "", function (err) {
            if (err)
                throw Error("Error while creating user list");
        });
    }
    configureLists();


    app.post('/register', function (req, res) {

        let name = req.body.name;
        let pass = req.body.password;
        authenticationRegister(name, function (val) {
            // If val == true then the user is authentic to register
            if (val) {
                let obj = {userName: name, password: pass};
                let jsonObj = JSON.stringify(obj, null, 2);
                //     Callback when created
                fs.appendFile(usersFile, jsonObj, function (err) {
                    if (err) {
                        res.status(500).send("error");
                        return;
                    }
                });
                res.status(200).send("OK");
            } else {
                res.status(500).send("exists");
            }
        });
    });

    // Handling login request
    app.post('/login', function (req, res) {
        let name = req.params.userId;
        let pass = req.params.password;
        authenticationLogin(name, pass, function (val) {
            //Exist
            if (val) {
                var uid = logedInUsers[req.params.user];
                //Already logged in
                if (uid) { // Return his UID
                    res.cookie('uid', uid);
                } else {
                    UIDcountrer++;
                    logedInUsers[name] = UIDcountrer;
                    logedInUsersTag[UIDcountrer] = name;

                    var options = {
                        maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                        httpOnly: true, // The cookie only accessible by the web server
                        // signed: true // Indicates if the cookie should be signed
                    }
                    res.cookie('uid', UIDcountrer, options);
                }
                res.status(200).send("OK");
            } else {
                res.status(500).send("Opps, The user doesnt exist ");
            }
        });
    });

};