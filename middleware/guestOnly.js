module.exports = (req, res, next) => {
    if (req.session.user) {
      return res.redirect("/"); // Redirect logged-in users
    }
    next();
  };
  