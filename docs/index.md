# CS351 Group 3 Project 2:

### Introduction:
Our website titled Guard Gear is a an e-commerce site targeted towards people who train in Brazilian Jiu-Jitsu. We sell products for people of all skill levels including gis, rashguards, and belts for. The website allows the user to create an account and add items to a cart for checkout.

### Front-end Development:
- home.html
- shop.html
- mensgis.html
- womensgis.html
- mensrashguards.html
- womensrashguards.html
- belts.html
- createAccount.html
- account.html
  
### Back-end Development:
Using node.js + express in the Webstorm development environment, we implemented a back-end structure to the project including: 
app.js: Acts as the main entry point into the application which creates an express app, handles middleware functions, and defines the routes we use.

#### controllers
- database.js: Contains the functions to add users to the database, getting an existing account from the database, storing the users order, adding the cart to the database, handling checkout, and getting an order summary.
- databaseConnections.js: Includes our MongoDB URI for accessing the contents of the database throughout the program
  
#### routes
- addToCart.js
- cart.js
- checkOut.js
- createAccount.js
- index.js
- loginSuccess.js
- users.js
  
#### views
Apart from the js files that will be in charge of the logic .ejs files are also present in our
backend in order to create the HTML for our front end, these are:
-addToCart.ejs
- cart.ejs
- checkOut.ejs
- error.ejs
- index.ejs
- loginSuccess.ejs
- success.ejs
