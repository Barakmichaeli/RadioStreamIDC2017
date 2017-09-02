/**
 * Created by barak on 18/08/2017.
 */


let devServer = require("./server");
let backServer = require('./backendServer');


const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";


if (PROD) {
    backServer(PORT);
} else {
    devServer(PORT);
}