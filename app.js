/**
 * Created by barak on 18/08/2017.
 */
let apiServer =  require("./server");
// let appServer =  require("./server");

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

// const PORT = process.env.PORT || 8080;
// const backendPort = PORT - 1;

// if (PROD) {
    //Production
    apiServer(PORT);
// } else {
//     Development env
    // apiServer(PORT - 1);
    // appServer(PORT);
// }