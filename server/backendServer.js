/**
 * Created by barak on 18/08/2017.
 */


module.exports = (PORT) => {

    let express = require("express");
    const app = express();
    let bodyParser = require('body-parser');
    let cookieParser = require('cookie-parser');

    let fs = require('fs');
    let logedInUsers = {};
    let UIDcountrer = 0;
    let logedInUsersTag = {};

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
    app.use(cookieParser());

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


    app.post('/register', function (req, res) {

        let user = {
            username: req.body.username,
            pass: req.body.password,
            first: req.body.firstName,
            last: req.body.lastName,
            email: req.body.email
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
                    console.log(x[i]);
                    if (x[i].username === username && x[i].pass === pass) {
                        callback(true);
                        return;
                    }
                }
            }
            callback(false);
        });
    }


    // Handling login request
    app.post('/login', function (req, res) {

        let name = req.body.username;
        let pass = req.body.password;

        authenticationLogin(name, pass, function (val) {
            //Exist
            if (val) {
                let uid = logedInUsers[name];
                //Already logged in
                if (uid) { // Return his UID
                    res.cookie('uid', uid);
                } else {
                    UIDcountrer++;
                    logedInUsers[name] = UIDcountrer;
                    logedInUsersTag[UIDcountrer] = name;
                    let options = {
                        maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                        httpOnly: true, // The cookie only accessible by the web server
                        // signed: true // Indicates if the cookie should be signed
                    };
                    res.cookie('uid', UIDcountrer, options);
                }
                res.status(200).send("OK");
            } else {
                res.status(500).send("exist");
            }
        });
    });

    app.post('/addFavorite', function (req, res) {

        let username = req.body.username;
        let station = req.body.station;
        let action = req.body.status;
        //Validate if logged in?

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
            }
            //Our data
            console.log(station);
            let obj = JSON.parse(data);

            //Search for the file
            for (x in obj) {
                if (obj[x].userName === username) {
                    obj[x].favorites.push(station);
                    //add to the favorite lists
                    fs.writeFile(usersFile, JSON.stringify(obj), function (err) {
                        if (err) {
                            console.log(err.message);
                            res.status(500).send(JSON.stringify({text: "Error override the file"}));
                        }
                        ;
                        console.log('file saved');
                    });
                    break;
                }
            }
            res.status(200).send(JSON.stringify({text: "Added"}));
        });
    });


    app.post('/removeFavorite', function (req, res) {

        let username = req.body.username;
        let station = req.body.station;
        //Validate if logged in?

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
            }

            //Our data
            let obj = JSON.parse(data);

            //Search for the file
            for (x in obj) {
                if (obj[x].userName === username) {
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


    app.post('/update', function (req, res) {
        console.log("Update information request arrived");
        console.log(req.cookies);

        //Constant user name
        let userName = req.body.userName;

        // Check if user is connected
        if (logedInUsers.username) {
            console.log('User is logged in...');
            fs.readFile(usersFile, 'utf8', function (err, data) {
                if (err) {
                    res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
                }
                let obj = JSON.parse(data);

                console.log(obj);
                //Search for the file
                for (x in obj) {
                    console.log("looping");
                    if (obj[x].userName === userName) {
                        obj[x].firstName = req.body.firstName;
                        obj[x].lastName = req.body.lastName;
                        obj[x].email = req.body.email;
                        obj[x].password = req.body.password;

                        console.log(obj);
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


    app.get('/favorites/:username', function (req, res) {

        let username = req.params.username;
        //Validate if logged in?

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send(JSON.stringify({text: "Error while reading the file", favorites: []}));
            }

            //Our data
            let obj = JSON.parse(data);
            let arr = [];

            //Search for the file
            for (x in obj) {
                if (obj[x].userName === username) {
                    arr = obj[x].favorites;
                    break;
                }
            }
            console.log("server returned " + arr);
            res.status(200).send(JSON.stringify({text: "Removed", favorites: arr}));
        });
    });
};