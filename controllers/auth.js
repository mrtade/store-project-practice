const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // isLoggedIn can be called anything. Its a property added to req.session object as seen in the console log
  // console.log(req.session);

  // Access user database to authenticate below user and then add session cookie details (user and isLoggedIn)
  User.findById("5dc35cdda33d9b230481b685")
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      // Redirect when the session is confirmed saved on the database
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
