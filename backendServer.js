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
    let usersFile = './usersList.json';
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());


    app.listen(PORT, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Backend Server is up! on : " + PORT);
    });

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + (process.env.PORT || 8080));
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, set=');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });


    app.get('/bundle.js', function (req, res) {
        res.sendFile(__dirname + '/build/bundle.js');
    });

    app.get('*', function (req, res, next) {

        if (req.path === "/api/connection")
            next();
        else
            res.sendFile(__dirname + '/build/index.html');

    });


    function configureLists() {
        //Our database is a text/Json format file on the server,
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
            //Case the database is empty - first register
            if (data.length !== 0) {
                obj = JSON.parse(data);
                //If user exists return with reason
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

            //If user doesn't exist + the file doesn't empty we add new member and return true
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
            gender: req.body.gender,
            favorites: []
        };
        authenticationRegister(user, function (val, reason) {
            if (val) {
                //case user registered successfully return status 200.
                res.status(200).send({MSG: "ADDED"});
            }
            else {
                //case we had problem return the reason
                let msg = {};
                switch (reason) {
                    case "user":
                        msg = JSON.stringify({MSG: "Username already exists"});
                        res.status(500).send(msg);
                        break;
                    case "email":
                        msg = JSON.stringify({MSG: "Email already exists"});
                        res.status(500).send(msg);
                        break;
                    default:
                        msg = JSON.stringify({MSG: "Please try again later :("});
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

    app.post('/api/login', function (req, res) {

        let username = req.body.username;
        let pass = req.body.password;

        authenticationLogin(username, pass, function (val, user) {
            if (val) {
                //Case user logged in - return his data from the server
                let userInformation = {
                    username: user.username,
                    first: user.first,
                    last: user.last,
                    email: user.email,
                    favorites: user.favorites
                };

                let uid = logedInUsers[username];
                if (uid) {
                    //already logged in - return his uid
                    res.cookie('uid', uid);
                } else {
                    //if not logged in return this
                    UIDcountrer++;
                    logedInUsers[username] = UIDcountrer;
                    logedInUsersTag[UIDcountrer] = username;
                    res.cookie('uid', UIDcountrer, {maxAge: 1000 * 60 * 60});
                }
                res.status(200).send(JSON.stringify(userInformation));
            } else {
                res.status(404).send(JSON.stringify("Couldn't find the user"));
            }
        });
    });


    //Check if the client is connected and therefore allowed to continue match urls
    app.use(function (req, res, next) {
        if (logedInUsersTag[req.cookies.uid])
            next();
        else
            res.status(404).send(JSON.stringify({text: "NOT LOGGED IN"}));
    });


    app.post('/api/logout', function (req, res) {
        //User logged out - so we remove from online lists of users
        let username = logedInUsersTag[req.cookies.uid];
        delete logedInUsersTag[req.cookies.uid];
        delete logedInUsers[username];
        res.status(200).send();
    });


    app.post('/api/remove', function (req, res) {

        let username = req.body.username;
        let uid = logedInUsers[username];

        //Delete member from online members objects
        delete logedInUsersTag[uid];
        delete logedInUsers[username];

        fs.readFile(usersFile, 'utf8', function (err, data) {
            if (err)
                res.status(500).send(JSON.stringify({text: "Error while reading the file"}));

            let obj = JSON.parse(data);

            //Search and remove the member
            for (x in obj)
                if (obj[x].username === username) {

                    //Delete member from array
                    obj.splice(x, 1);

                    //Write back the data
                    fs.writeFile(usersFile, JSON.stringify(obj), function (err) {
                        if (err) {
                            console.log(err.message);
                            res.status(500).send(JSON.stringify({text: "Error override the file"}));
                        }
                        res.status(200).send();
                    });
                }
        })
    });


    //Set new cookie
    app.use(function (req, res, next) {
        //Set new UID in both objects
        UIDcountrer++;
        let username = logedInUsersTag[req.cookies.uid];
        logedInUsers[username] = UIDcountrer;
        delete logedInUsersTag[req.cookies.uid];
        logedInUsersTag[UIDcountrer] = username;
        req.cookies.uid = UIDcountrer;
        res.cookie('uid', UIDcountrer, {maxAge: 1000 * 60 * 60});
        next();
    });


    app.get('/api/connection', function (req, res) {

        let username = logedInUsersTag[req.cookies.uid];
        let data;
        try {
            data = fs.readFileSync(usersFile, 'utf8');

        } catch (err) {
            res.status(500).send(JSON.stringify({text: "Error reading the file"}));
            return;
        }

        let obj = JSON.parse(data);
        let userInformation = {};
        for (x in obj) {
            if (obj[x].username === username) {
                userInformation = {
                    username: obj[x].username,
                    first: obj[x].first,
                    last: obj[x].last,
                    email: obj[x].email,
                    favorites: obj[x].favorites
                };
                break;
            }
        }

        res.status(200).send(JSON.stringify(userInformation));
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
                        console.log('File updated with new favorites');
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
    });
};