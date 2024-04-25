var { uri } = require('./databaseConnections');

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
module.exports.saveNewCustomer =  function(req, res, next) {
console.log("is inside Save new customer")
    //step 2.1 Read in the incomming form data for the customer: name, email
    //expecting data variable called name --retrieve value using body-parser
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var value_username= req.body.username;  //retrieve the data associated with name
    var value_email = req.body.email;  //retrieve the data associated with email
    var value_password = req.body.password;  //retrieve the data associated with email
    var value_street = req.body.street;  //retrieve the data associated with email
    var value_city = req.body.city;  //retrieve the data associated with email
    var value_state = req.body.state;  //retrieve the data associated with email
    var value_zip = req.body.zip;  //retrieve the data associated with email
    var value_phone = req.body.phone;  //retrieve the data associated with email


   console.log("NEW Customer Data  " + value_username + "  email: " + value_email);

    //step 2.2 Call the function defined below that will connect to your MongDB collection and create a new customer
    saveCustomerToMongoDB(value_username,value_email,value_password,value_street,value_city,value_state,value_zip,value_phone);

    //step 2.3 Send a response welcoming the new user
   res.render('success')
    // res.send("Welcome,  " + value_username + "</br> We will reach you at: " + value_email);

};

async function saveCustomerToMongoDB(username,email,password,street,city,state,zip,phone) {
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
        var customersCollection = db0.collection('users');
        console.log("collection is " + customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        //STEP E: insert the new customer and display in console the new # documents in customers
        console.log("Insert new customer");
        await customersCollection.insertOne({"username":username,"email":email,"password":password,"street": street,"city":city,"state":state,"zip":zip,"phone":phone});
        console.log("  # documnents now = " + await customersCollection.countDocuments());


    } finally {
        // STEP F: Ensures that the client will close when you finish/error
        await client.close();
    }
}
module.exports.getAccount= async function (req, res, next) {
    try {

        //STEP A: Connect the client to the server  (optional starting in v4.7)
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shoppingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());
        //STEP D: grab the customers collection
        var customersCollection = db0.collection('users');
        console.log("collection is " + customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());
        const listCursor = customersCollection.find().limit(10);
        const loginSuccess = await listCursor.toArray();

        res.render('loginSuccess', {title: 'loginSuccess', loginSuccess});

    } catch (error) {
        console.error("Error fetching customer data: ", error);
        res.status(500).send("Error fetching customer data");
    } finally {
        // STEP F: Ensures that the client will close when you finish/error
        await client.close();

    }
}
module.exports.checkOut = async function (req, res, next) {
    try {

        //STEP A: Connect the client to the server  (optional starting in v4.7)
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shoppingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());
        //STEP D: grab the customers collection
        var customersCollection = db0.collection('orders');
        console.log("collection is " + customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());
        const listCursor = customersCollection.find().limit(10);
        const cart = await listCursor.toArray();

        res.render('cart', {title: 'cart', cart});

    } catch (error) {
        console.error("Error fetching customer data: ", error);
        res.status(500).send("Error fetching customer data");
    } finally {
        // STEP F: Ensures that the client will close when you finish/error
        await client.close();

    }
}
