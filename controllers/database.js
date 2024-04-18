//import uri from './databaseConnection.js';
//the databaseConnection.js is inside the same controllers folder and ONLY has one line the connectivity uri
// to connect your NodeJS code to YOUR MongoDB instance
// module.exports = { uri: 'mongodb+srv://YOUR_Login:YOUR_Password@cluster0.WHATEVER.mongodb.net/?retryWrites=true&w=majority' };


var { uri } = require('./databaseConnection');

//Define some varibles needed for the database Controller functions
const { MongoClient, ServerApiVersion } = require('mongodb');

//connection string, fill it in with YOUR information for your MongoDB deployment
//const uri = "mongodb+srv://grewe:jority";


// SETP 1: Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/* STEP 2: Controller function to save New customer data to the collection customers. */
module.exports.saveNewCustomer =  function(req, res, next) {

    //step 2.1 Read in the incomming form data for the customer: name, email
    //expecting data variable called name --retrieve value using body-parser
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var value_name = req.body.name;  //retrieve the data associated with name
    var value_email = req.body.email;  //retrieve the data associated with email


    console.log("NEW Customer Data  " + value_name + "  email: " + value_email);

    //step 2.2 Call the function defined below that will connect to your MongDB collection and create a new customer
    saveCustomerToMongoDB(value_name, value_email);

    //step 2.3 Send a response welcoming the new user
    res.send("Welcome,  " + value_name + "</br> We will reach you at: " + value_email);

};


/**
 * This is the main function save to your definde MongoClient defined at the top
 * which connects to your database here defined as "shoppingsite" and in it will access
 * the collection "customers" to create a new Customer with the name and email
 * NOTE: no check if the user already exists (with this email) is done BUT, SHOULD BE DONE
 * @param name
 * @param email
 * @returns {Promise<void>}
 */
async function saveCustomerToMongoDB(name, email) {
    try {

        //STEP A: Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shoppingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('customers');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        //STEP E: insert the new customer and display in console the new # documents in customers
        console.log("Insert new customer");
        await customersCollection.insertOne({"name": name, "email": email });
        console.log("  # documnents now = " + await customersCollection.countDocuments());


    } finally {
    // STEP F: Ensures that the client will close when you finish/error
    await client.close();
    }
}
module.exports.getCustomers = async function(req, res, next) {
    try {

        //STEP A: Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shoppingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection = db0.collection('customers');
        console.log("collection is " + customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        const customerlistCursor = customersCollection.find().limit(10);
        const customerlist = await customerlistCursor.toArray();

        res.render('customerlist', {title: 'customerlist', customerlist});
    } catch (error) {
        console.error("Error fetching customer data: ", error);
        res.status(500).send("Error fetching customer data");
    } finally {
        // STEP F: Ensures that the client will close when you finish/error
        await client.close();

    }
}