exports.getLogin = (req, res, next) => {
  const isLoggedIn = req
    .get("Cookie")
    .trim()
    .split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn === "true"
  });
};

exports.postLogin = (req, res, next) => {
  // Set a cookie using the setHeader method on response. Set-Cookie is a stored keyword, loggedIn=true is what we set
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
