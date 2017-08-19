/**
 * Created by barak on 18/08/2017.
 */

var express = require ("express");
var app = express();

module.exports = (PORT) => {
    const app = express();
    app.listen(PORT , function(err){
        if(err)
            console.log(err);
        else
            console.log("Backend is up! on " + PORT);
    });
};