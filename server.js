const dotenv = require("dotenv");
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const database = require("./config/Database.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const app = express();

//-------------------------------[[ Functions ]]-----------------------------

// ------------------------------[[ Main execution ]]-------------------------------
async function startApp() {
  // Establish DB connection first
  const DB_Connection = await database.connectToDB(
    process.env.MONGODB_URI,
    process.env.PASSWORD
  );

  // Public assets
  app.use(express.static("public"));

  // Use middleware for parsing form data
  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method")); // Needed for the 'app.delete()' route to work
  app.use(morgan("dev")); // Needed for the 'app.delete()' route to work

  // SESSIONS
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true, // Ensures session object is initialized
      cookie: { secure: false }, // Set to `true` if using HTTPS
    })
  );

  // Makes `user` accessible in all views
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

  // Use imported routes
  [
    { routeName: "root", path: "/" },
    { routeName: "users", path: "/users" },
    { routeName: "auth", path: "/auth" },
    { routeName: "recipes", path: "/recipes" },
    { routeName: "likes", path: "/recipes/:recipeId/likes" },
    { routeName: "comments", path: "/recipes/:recipeId/comments" },
  ].forEach((routeItem) => {
    const route = require(`./routes/${routeItem.routeName}.js`);
    app.use(routeItem.path, route);
  });

  // App listener
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  // Closing the DB connection when the server shuts down
  process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await DB_Connection.closeConnection();
    process.exit();
  });
}

startApp();
