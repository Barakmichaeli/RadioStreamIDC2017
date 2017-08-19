var express = require('express');
var fs = require('fs');
var path = require('path');
var jsonfile = require('fs');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Start of our code:

var usersFile = './usersList.json';
var UIDcountrer = 1;
var logedInUsers = {}; // {barak : UID}
var logedInUsersTag = {}; //{uid , barak};
configureLists();

// Set the public directory for all static files
app.use(express.static(path.join(__dirname, 'public')));

// Handling all get requests -> returning the login page
app.get("/", function (req, res) {
    /* Original, reference all get requests to login page
     res.sendFile(path.join(__dirname + "/" + "public" + "/" + "loginPage.html"));
     */
    // Just for testing that radioStreaming works fine (open with Chrome):
    res.sendFile(path.join(__dirname + "/" + "public" + "/" + "homePage.html"));
});

// Handling login request
app.post('/login/:userId/:password', function (req, res) {
    var name = req.params.userId;
    var pass = req.params.password;
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

// Handling register request
app.post('/register/:userId/:password', function (req, res) {
    var name = req.params.userId;
    var pass = req.params.password;
    //False = dont exist
    authenticationRegister(name, function (val) {
        //If val == true then the user is authentic to register
        if (val) {
            var obj = {userName: name, password: pass};
            var jsonObj = JSON.stringify(obj, null, 2);
            //Callback when created
            jsonfile.appendFile(file, jsonObj, function (err) {
                if (err) {
                    res.status(500).send("Opps, Something went wrong..");
                    return;
                }
            });
            res.status(200).send("redirect");
        } else {
            res.status(500).send("Opps, The user is already exists");
        }
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found right now..');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


function authenticationRegister(userName, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
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
    jsonfile.appendFile(usersFile, "", function (err) {
        if (err)
            throw Error("Error while creating user list");
    });
}

module.exports = app;


