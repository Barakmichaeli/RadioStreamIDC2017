/**
 * Created by barak on 18/08/2017.
 */

module.exports = (PORT) => {

    let express = require("express");
    const app = express();
    const path = require('path');
    let bodyParser = require('body-parser');
    let cookieParser = require('cookie-parser');
    let fs = require('fs');
    let logedInUsers = {};
    let UIDcountrer = 0;
    let logedInUsersTag = {};

    app.get('/bundle.js', function (req, res) {
        res.sendFile(__dirname + '/build/bundle.js');
    });
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/build/index.html');
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());


    app.listen(PORT, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Backend Server is up! on : " + PORT);
    });

    // Allowing access to our main api server
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + (process.env.PORT || 8080));
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, set=');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

    let usersFile = './usersList.json';
    function configureLists() {
        if (!fs.existsSync(usersFile)) {
            fs.writeFile(usersFile, "[]", function (err) {
                if (err)
                    throw Error("Error while creating user list");
            });
        }
    }

    configureLists();
    function authenticationRegister(user, callback) {

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                callback(false, "error");
            }

            let obj = [];
            if (data.length !== 0) {
                obj = JSON.parse(data);
                //IF user exists return with reason
                for (i in obj) {
                    if (obj[i].username === user.username) {
                        callback(false, "user");
                        return;
                    }
                    if (obj[i].email === user.email) {
                        callback(false, "email");
                        return;
                    }
                }
            }
            //If user doesnt exist we
            // add him and return true
            obj.push(user);
            let jsonObj = JSON.stringify(obj, null, 2);
            fs.writeFile(usersFile, jsonObj, function (err) {
                if (err)
                    console.log("error");
            });
            callback(true);
        });
    }


    app.post('/api/register', function (req, res) {

        let user = {
            username: req.body.username,
            pass: req.body.password,
            first: req.body.firstName,
            last: req.body.lastName,
            email: req.body.email,
            gender : req.body.gender,
            favorites: []
        };
        authenticationRegister(user, function (val, reason) {

            //Confirmed
            if (val) {
                res.status(200).send({MSG: "ADDED"});
            }
            else {
                let msg = {};
                switch (reason) {
                    case "user":
                        msg = JSON.stringify({MSG: "user name exists"});
                        res.status(500).send(msg);
                        break;
                    case "email":
                        msg = JSON.stringify({MSG: "email exists"});
                        res.status(500).send(msg);
                        break;
                    default:
                        msg = JSON.stringify({MSG: "There was a problem"});
                        res.status(500).send(msg);
                }
            }
        });
    });


    function authenticationLogin(username, pass, callback) {
        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send("Opps, Something went wrong..");
            }

            if (data.length !== 0) {
                let x = JSON.parse(data);
                for (i in x) {
                    if (x[i].username === username && x[i].pass === pass) {
                        callback(true, x[i]);
                        return;
                    }
                }
            }
            callback(false);
        });
    }


    // Handling login request
    app.post('/api/login', function (req, res) {

        let username = req.body.username;
        let pass = req.body.password;

        authenticationLogin(username, pass, function (val, user) {

            if (val) {
                let userInformation = {
                    username: user.username,
                    first: user.first,
                    last: user.last,
                    email: user.email,
                    favorites: user.favorites
                };
                let uid = logedInUsers[username];
                //Already logged in
                if (uid) { // Return his UID
                    res.cookie('uid', uid);
                } else {
                    //If not logged in return this
                    UIDcountrer++;
                    logedInUsers[username] = UIDcountrer;
                    logedInUsersTag[UIDcountrer] = username;
                    let options = {
                        maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                        httpOnly: true, // The cookie only accessible by the web server
                        // signed: true // Indicates if the cookie should be signed
                    };
                    res.cookie('uid', UIDcountrer, options);
                }
                res.status(200).send(JSON.stringify(userInformation));
            } else {
                res.status(500).send(JSON.stringify("Not found"));
            }
        });
    });


    app.post('/api/logout', function (req, res) {

        delete logedInUsersTag[req.cookies.uid];
        res.status(200).send();

    });


    app.get('/api/connection', function (req, res, next) {

        let username = logedInUsersTag[req.cookies.uid];

        //If connected return other uid and move foward
        if (username) {

            //Set New cookie
            UIDcountrer++;
            logedInUsers[username] = UIDcountrer;
            delete logedInUsersTag[req.cookies.uid];
            logedInUsersTag[UIDcountrer] = username;

            let options = {
                maxAge: 1000 * 60 * 60, // would expire after 60 minutes
            };
            res.cookie('uid', UIDcountrer);

            fs.readFile(usersFile, 'utf8', function (err, data) {
                if (err)
                    res.status(500).send(JSON.stringify({text: "Error while reading the file"}));

                let obj = JSON.parse(data);
                for (x in obj) {
                    if (obj[x].username === username)
                        res.status(200).send(JSON.stringify(obj[x]));
                }
            });
        } else {
            res.status(404).send("cant access page");
        }
    });


    app.post('/api/addFavorite', function (req, res) {

        let username = req.body.username;
        let station = req.body.station;

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
            }
            //Our data
            let obj = JSON.parse(data);

            //Search for the file
            for (x in obj) {
                if (obj[x].username === username) {
                    obj[x].favorites.push(station);
                    fs.writeFile(usersFile, JSON.stringify(obj), function (err) {
                        if (err) {
                            console.log(err.message);
                            res.status(500).send(JSON.stringify({text: "Error override the file"}));
                        }
                        console.log('file saved');
                    });
                }
            }
            res.status(200).send(JSON.stringify({text: "Added"}));
        });
    });


    app.post('/api/removeFavorite', function (req, res) {

        let username = req.body.username;
        let station = req.body.station;

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
            }

            //Our data
            let obj = JSON.parse(data);

            //Search for the file
            for (x in obj) {
                if (obj[x].username === username) {
                    if (obj[x].favorites.includes(station)) {
                        let index = obj[x].favorites.indexOf(station);
                        obj[x].favorites.splice(index, 1);
                    }
                    //add to the favorite lists
                    fs.writeFile(usersFile, JSON.stringify(obj), function (err) {
                        if (err) {
                            console.log(err.message);
                            res.status(500).send(JSON.stringify({text: "Error override the file"}));
                        }
                        ;
                    });
                    break;
                }
            }
            res.status(200).send(JSON.stringify({text: "Removed"}));
        });
    });


    app.post('/api/update', function (req, res) {

        //Constant user name
        let username = req.body.username;

        // Check if user is connected
        if (logedInUsers[username]) {

            fs.readFile(usersFile, 'utf8', function (err, data) {
                if (err) {
                    res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
                }
                let obj = JSON.parse(data);
                //Search for the file
                for (x in obj) {
                    if (obj[x].username === username) {
                        obj[x].first = req.body.first;
                        obj[x].last = req.body.last;
                        obj[x].email = req.body.email;
                        obj[x].pass = req.body.pass;

                        // Write back updated user details to users file
                        fs.writeFile(usersFile, JSON.stringify(obj), function (err) {
                            if (err) {
                                console.log(err.message);
                                res.status(500).send(JSON.stringify({text: "Error override the file"}));
                            }
                        });
                        break;
                    }
                }
                res.status(200).send(JSON.stringify({text: "User details updated successfully"}));
            });
        }
        else {
            // User Doesnt logged in
            res.status(400).send(JSON.stringify({text: "Error with request from client"}));
        }
    });
}