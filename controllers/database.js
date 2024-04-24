
var { uri } = require('./databaseConnection');

//Define some variables needed for the database Controller functions
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// POST request to storeOrder
module.exports.storeOrder = function(req, res, next) {
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var valueOrders = req.body.orders;  //retrieve the data associated with orders
    var valueBilling = req.body.billing;  //retrieve the data associated with billing
    var valueUsers = req.body.users; //retrieve the data associated with users
    var valueShipping = req.body.shipping; //retrieve the data associated with shipping

    console.log("NEW Store Order:  " + valueOrders +
        "  Billing: " + valueBilling +
        "  Users: " + valueUsers +
        "  Shipping: " + valueShipping);

    //Call the function defined below that will connect to your MongoDB collection and create a new order
    saveStoreOrderToMongoDB(valueOrders, valueBilling, valueUsers, valueShipping);

    //Send a response welcoming the new user
    res.send(" THANK YOUR FOR YOUR SUBMITTED ORDER ");
}

// BASIC baseline for sending storeOrder data to mongoDB
async function saveStoreOrderToMongoDB(orders, billing, users, shipping) {
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

        //grab the collection ORDERS
        var shoppingSiteCollection =  db0.collection('orders');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new ORDER and display in console the new # documents in ORDERS
        console.log("Insert new order");
        await shoppingSiteCollection.insertOne({"ORDER": orders});
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

        //grab the collection BILLING
        shoppingSiteCollection =  db0.collection('billing');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new BILLING and display in console the new # documents in BILLING
        console.log("Insert new billing");
        await shoppingSiteCollection.insertOne({"BILLING": billing});
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

        //grab the collection USERS
        shoppingSiteCollection =  db0.collection('users');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new USER and display in console the new # documents in USERS
        console.log("Insert new user");
        await shoppingSiteCollection.insertOne({"USER": users});
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

        //grab the collection SHIPPING
        shoppingSiteCollection =  db0.collection('shipping');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new ORDER and display in console the new # documents in ORDERS
        console.log("Insert new shipping");
        await shoppingSiteCollection.insertOne({"SHIPPING": shipping});
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

    } finally {
        //Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports.getOrderSummary = async function(req, res, next) {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        var db0 = client.db("shoppingsite");
        console.log("got shopping site");

        // Fetch data from the database
        // Example: Assuming you have a collection named 'orders' and you want to fetch all documents from it
        const ordersCollection = db0.collection('orders');
        const orders = await ordersCollection.find({}).toArray();

        // Example: Assuming you have a collection named 'billing' and you want to fetch the first document from it
        const billingCollection = db0.collection('billing');
        const billing = await billingCollection.findOne({});

        // Example: Assuming you have a collection named 'orders' and you want to fetch all documents from it
        const usersCollection = db0.collection('users');
        const users = await usersCollection.find({}).toArray();

        // Example: Assuming you have a collection named 'billing' and you want to fetch the first document from it
        const shippingCollection = db0.collection('shipping');
        const shipping = await shippingCollection.findOne({});


        // Similarly, fetch data from other collections as needed

        // Render the 'checkOut' view with the fetched data
        res.render('checkOut', {
            title: "Check Out",
            orders: orders,
            billing: billing,
            users: users,
            shipping: shipping
            // Pass other fetched data here
        });
    } catch (error) {
        console.error("Error fetching order data:", error);
        res.status(500).send("Error fetching order data");
    } finally {
        await client.close();
    }

}


// POST request to storeOrder
module.exports.storeUser = function(req, res, next) {
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var valueUsername = req.body.username;  //retrieve the data associated with username
    var valueEmail = req.body.email;  //retrieve the data associated with email
    var valuePassword = req.body.password; //retrieve the data associated with password
    var valueStreet = req.body.street; //retrieve the data associated with street
    var valueCity = req.body.city;  //retrieve the data associated with city
    var valueState = req.body.state;  //retrieve the data associated with state
    var valueZip = req.body.zip; //retrieve the data associated with zip
    var valuePhone = req.body.phone; //retrieve the data associated with phone

    console.log("NEW  User:  " + valueUsername +
        "  email: " + valueEmail );

    //Call the function defined below that will connect to your MongoDB collection and create a new order
    saveUserToMongoDB(valueUsername, valueEmail, valuePassword,
        valueStreet, valueCity, valueState, valueZip, valuePhone);

    //Send a response welcoming the new user
    res.send(" THANK YOUR FOR YOUR CREATING AN ACCOUNT ");
}

// BASIC baseline for sending storeOrder data to mongoDB
async function saveUserToMongoDB(user, email, password, street, city, state, zip, phone) {
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

        //grab the collection ORDERS
        var shoppingSiteCollection =  db0.collection('users');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new ORDER and display in console the new # documents in ORDERS
        console.log("Insert new order");
        await shoppingSiteCollection.insertOne({"USER": user, "EMAIL": email, "PASSWORD": password, "STREET": street, "CITY": city, "STATE": state, "ZIP": zip, "PHONE": phone  });
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());


    } finally {
        //Ensures that the client will close when you finish/error
        await client.close();
    }
}