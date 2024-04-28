var { uri } = require('./databaseConnection');
//Define some variables needed for the database Controller functions
const { MongoClient, ServerApiVersion } = require('mongodb');
var logCart = require("../models/logcart");

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
    var value_productid = req.body.productid;  //retrieve the data associated with orders
    var value_productname = req.body.productname;  //retrieve the data associated with orders
    var value_productprice = req.body.productprice;  //retrieve the data associated with orders
    var value_productquantity = req.body.productquantity;  //retrieve the data associated with orders
    var value_cardnumber = req.body.cardnumber;  //retrieve the data associated with billing
    var value_cardname = req.body.cardname;  //retrieve the data associated with billing
    var value_expiredate = req.body.expiredate;  //retrieve the data associated with billing
    var value_cvv = req.body.cvv;  //retrieve the data associated with billing
    var value_account = req.body.account;  //retrieve the data associated with billing
    var value_username = req.body.username; //retrieve the data associated with users
    var value_password = req.body.password; //retrieve the data associated with users
    var value_email = req.body.email; //retrieve the data associated with users
    var value_street = req.body.street; //retrieve the data associated with shipping
    var value_city = req.body.city; //retrieve the data associated with shipping
    var value_state = req.body.state; //retrieve the data associated with shipping
    var value_zip = req.body.zip; //retrieve the data associated with shipping

    console.log(
        "  ProductID:  " + value_productid +
        "  ProductName:  " + value_productname +
        "  ProductPrice:  " + value_productprice +
        "  ProductQuantity:  " + value_productquantity +
        "  CardNumber: " + value_cardnumber +
        "  CardName: " + value_cardname +
        "  ExpireDate: " + value_expiredate +
        "  Cvv: " + value_cvv +
        "  AccountType: " + value_account +
        "  Username: " + value_username +
        "  Password: " + value_password +
        "  Email: " + value_email +
        "  Street: " + value_street +
        "  City: " + value_city +
        "  State: " + value_state +
        "  Zip: " + value_zip);

    //Call the function defined below that will connect to your MongoDB collection and create a new order
    saveStoreOrderToMongoDB(value_productid, value_productname, value_productprice, value_productquantity, value_cardnumber, value_cardname, value_expiredate, value_cvv, value_account, value_username, value_password, value_email, value_street, value_state, value_city, value_zip);
    //Send a response welcoming the new user
    res.send(" THANK YOUR FOR YOUR SUBMITTED ORDER ");
}

// BASIC baseline for sending storeOrder data to mongoDB
async function saveStoreOrderToMongoDB(username, password, email, productid, productname, productprice, productquantity, cardnumber, cardname, expiredate, cvv, account, street, city, state, zip) {
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
        await shoppingSiteCollection.insertOne({"productid": productid, "productname": productname, "productquantity": productquantity, "productprice": productprice });
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

        //grab the collection BILLING
        shoppingSiteCollection =  db0.collection('billing');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new BILLING and display in console the new # documents in BILLING
        console.log("Insert new billing");
        await shoppingSiteCollection.insertOne({"cardnumber": cardnumber, "cardname": cardname, "expiredate": expiredate, "cvv": cvv, "account": account});
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

        //grab the collection USERS
        shoppingSiteCollection =  db0.collection('users');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new USER and display in console the new # documents in USERS
        console.log("Insert new user");
        await shoppingSiteCollection.insertOne({"username": username, "password": password, "email": email});
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());

        //grab the collection SHIPPING
        shoppingSiteCollection =  db0.collection('shipping');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new ORDER and display in console the new # documents in ORDERS
        console.log("Insert new shipping");
        await shoppingSiteCollection.insertOne({"street": street, "city": city , "state": state , "zip": zip});
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
        const ordersCollection = db0.collection('orders');
        const orders = await ordersCollection.find({}).toArray();

        const billingCollection = db0.collection('billing');
        const billing = await billingCollection.findOne({});

        const usersCollection = db0.collection('users');
        const users = await usersCollection.find({}).toArray();

        const shippingCollection = db0.collection('shipping');
        const shipping = await shippingCollection.findOne({});
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

// controller function to add item to cart
module.exports.addItemToCart =  async function(req, res, next) {
    try {
        // storing variable values from Post execution of product pages
        var body = JSON.stringify(req.body);
        var params = JSON.stringify(req.params);
        var value_productid = req.body.id;
        var value_productname = req.body.name;
        var value_productprice = req.body.price;
        var value_productquantity = req.body.quantity;
        var value_sessionid = req.session.id;
        var value_productpic = req.body.pic;
        // console messages for tracking
        console.log(
            "  Session ID:  " + value_sessionid +
            "  ProductID:  " + value_productid +
            "  ProductName:  " + value_productname +
            "  ProductPrice:  " + value_productprice +
            "  ProductQuantity:  " + value_productquantity +
            "  ProductPic:  " + value_productpic
        );
        // stores current session cart or makes one if does not exist
        var logcart = new logCart(req.session.logcart ? req.session.logcart: {});
        // add data into cart
        logcart.add(
            value_productid,
            value_productname,
            value_productprice,
            value_productquantity
        );
        // sets data into session cart and displays contents in log
        req.session.logcart = logcart;
        console.log(req.session.logcart);
        // sends values as parameters to database storing function
        addToCartAndToMongoDB(
            value_productid,
            value_productname,
            value_productprice,
            value_productquantity,
            value_sessionid
        );
        // renders addToCart view confirming process and sends product name as data to ejs
        res.render('addToCart', {
            title: "addToCart",
            data: value_productname,
            imagesrc: value_productpic
        });
    // error handling
    } catch (error) {
        console.error("Error fetching customer data:", error);
        res.status(500).send("Error fetching customer data");
    } finally {
        await client.close();
    }
};
// saves and stores product data to mongoDB database
async function addToCartAndToMongoDB(id, name, price, quantity, sessionID) {
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // Connect to the database "shoppingsite"
        var db0 = client.db("shoppingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());
        // Grab the collection ORDERS
        var shoppingSiteCollection =  db0.collection('orders');
        console.log("collection is "+ shoppingSiteCollection.collectionName);
        console.log(" # documents in it " + await shoppingSiteCollection.countDocuments());
        //insert the new ORDER and display in console the new # documents in ORDERS
        console.log("Insert new order");
        await shoppingSiteCollection.insertOne({
            "sessionID": sessionID,
            "productID": id,
            "productName": name,
            "productPrice": price,
            "productQuantity": quantity
        });
        console.log("  # documents now = " + await shoppingSiteCollection.countDocuments());
    // error handling
    } catch (error) {
        console.error("Error fetching customer data:", error);
        res.status(500).send("Error fetching customer data");
    } finally {
        await client.close();
    }
}

// creates a table with the list in database
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
        const listCursor = customersCollection.find();
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

module.exports.checkLogin = async function (req, res, next){
    try {

        // Extracting login credentials from the request body
        var value_username= req.body.username;  //retrieve the data associated with name
        var value_password = req.body.password;  //retrieve the data associated with email

        // Connect to the MongoDB client
        await client.connect();

        // Access the 'users' collection
        const usersCollection = client.db("shoppingsite").collection('users');

        // Find the user with the provided username and password
        const user = await usersCollection.findOne({ value_username, value_password });

        if (!user) {
            // If user is not found or password is incorrect, send a response indicating login failure
            return res.status(400).send("Invalid username or password");
        }

        // Send a response indicating successful login
        res.render('loginSuccess', { title: 'Login Success', user });
    } catch (error) {
        console.error("Error verifying login:", error);
        res.status(500).send("Error verifying login");
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }

}
