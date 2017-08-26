/**
 * Created by barak on 18/08/2017.
 */


module.exports = (PORT) => {

    let express = require("express");
    const app = express();
    let bodyParser = require('body-parser');
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

    let usersFile = './usersList.json';

    function authenticationRegister(userName, callback) {
        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send("Opps, Something went wrong..");
            }
            //Convert the JSON file to apropriate format
            if (data.length !== 0) {
                let text = data.replace(/}{/g, "},{").replace(/^{/, "[{") + "]";
                //Convert the array json to js array
                let obj = JSON.parse(text);
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
        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err) {
                res.status(500).send("Opps, Something went wrong..");
            }

            if (data.length != 0) {
                let x = data.replace(/}{/g, "},{").replace(/^{/, "[{") + "]";
                x = JSON.parse(x);
                for (i in x) {
                    if (x[i].userName === userName && x[i].password === pass) {
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

        let name = req.body.username;
        let pass = req.body.password;
        let first = req.body.firstName;
        let last = req.body.lastName;
        let email = req.body.email;

        authenticationRegister(name, function (val) {
            // If val == true then the user is authentic to register
            if (val) {
                let obj = {
                    userName: name, password: pass, firstName: first, lastName: last,
                    email: email
                };
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
                    }
                    res.cookie('uid', UIDcountrer, options);
                }
                res.status(200).send("OK");
            } else {
                res.status(500).send("Opps, The user doesnt exist ");
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
                            console.log(err.message)
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

    // Handling login request
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
        console.log("Update information request arrived")
        let username = req.body.username
        // Check if user is connected
        if(logedInUsers.username) {
            console.log('User is logged in...')
            fs.readFile(usersFile, 'utf8', function (err, data) {
                if (err) {
                    res.status(500).send(JSON.stringify({text: "Error while reading the file"}));
                }
                let obj = JSON.parse(data);
                //Search for the file
                for (currentUser in obj) {
                    if (obj[currentUser].userName === username) {
                        obj[currentUser].firstName = req.body.firstName
                        obj[currentUser].lastName = req.body.lastName
                        obj[currentUser].email = req.body.email
                        obj[currentUser].password = req.body.password
                    }
                    // Write back updated user details to users file
                    fs.writeFile(usersFile, JSON.stringify(obj), function (err) {
                        if (err) {
                            console.log(err.message);
                            res.status(500).send(JSON.stringify({text: "Error override the file"}));
                        }
                    });
                    break;
            }
                res.status(200).send(JSON.stringify({text: "User details updated successfully"}));
            });
        }
        else {
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