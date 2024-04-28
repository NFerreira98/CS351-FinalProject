theme: jekyll-theme-minimal
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
- 25 individual product pages
- createAccount.html
- account.html
  
### Back-end Development:
Using node.js + express in the Webstorm development environment, we implemented a back-end structure to the project including: 
app.js: Acts as the main entry point into the application which creates an express app, handles middleware functions, and defines the routes we use.

#### controllers
- database.js: Contains the functions to add users to the database, getting an existing account from the database, storing the users order, adding the cart to the database, handling checkout, and getting an order summary.
- databaseConnections.js: Includes our MongoDB URI for accessing the contents of the database throughout the program
  
#### routes
- addToCart.js: Handles adding items to cart
- cart.js: Handles user going to checkout
- checkOut.js: Handles user order summary
- createAccount.js: Handles adding user to database and performs server-side validation
- index.js: Defines the GET and POST routes
- loginSuccess.js: Supposed to redirect user to account page if already existing account
- users.js
  
#### views
The route files we have work together with the view files of the corresponding names to create the front-end HTML pages that the user will see
- addToCart.ejs
- cart.ejs
- checkOut.ejs
- error.ejs
- index.ejs
- loginSuccess.ejs
- success.ejs
