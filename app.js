const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");

// Require mongodb connection from the /util/database folder
// const mongoConnect = require('./util/database').mongoConnect;
const User = require("./models/user");
const MONGODB_URI =
  "mongodb+srv://admin-mrtade:Momo123@cluster0-ft6tk.mongodb.net/shopDB?retryWrites=true&w=majority";
const app = express();

// Store the session in const store in collection mySessions in the database
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "mySessions"
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Use session middleware with store
app.use(
  session({
    secret: "this is supposed to be secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
/**
 * Allow custom mongoose methods work again
 * When logged in, fetch the current user id stored in the session
 * We get the required mongoose model by storing the data in req.user
 */
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// This is the callback function to spin-up the server only after connecting to the DB

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(connection => {
    // console.log(connection);
    console.log("*=*=*=*=*=*=*=*=*=*=*=*=*=*=*");
    console.log("Database connection successful!");
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Me",
          email: "me@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
      console.log("*=*=*=*=*=*=*=*=*=*=*=*=*=*=*");
      console.log(`Existing user "${user._id}" is connected!`);
      console.log("*=*=*=*=*=*=*=*=*=*=*=*=*=*=*");
    });

    app.listen(3000);
    console.log("*=*=*=*=*=*=*=*=*=*=*=*=*=*=*");
    console.log("Server started on port 3000.");
  })
  .catch(err => {
    console.log(err);
  });
