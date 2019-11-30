exports.getLogin = (req, res, next) => {
  const isLoggedIn = req
    .get("Cookie")
    .trim()
    .split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn === "true"
  });
};

exports.postLogin = (req, res, next) => {
  // isLoggedIn can be called anything. Its a property added to req.session object as seen in the console log
  // console.log(req.session);
  req.session.isLoggedIn = true;
  res.redirect("/");
};
