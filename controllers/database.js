//import uri from './databaseConnection.js';
//the databaseConnection.js is inside the same controllers folder and ONLY has one line the connectivity uri
// to connect your NodeJS code to YOUR MongoDB instance
// module.exports = { uri: 'mongodb+srv://YOUR_Login:YOUR_Password@cluster0.WHATEVER.mongodb.net/?retryWrites=true&w=majority' };


var { uri } = require('./databaseConnection');

//Define some varibles needed for the database Controller functions
const { MongoClient, ServerApiVersion } = require('mongodb');

// SETP 1: Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});