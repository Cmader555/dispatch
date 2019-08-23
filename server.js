const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const users = require("./routes/api/user");


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// DB Config
const db = require("./config/keys").mongoURI;

// Passport middleware
// app.use(passport.initialize());
// Passport config
// require("./config/middleware/passport")(passport);
// Routes
require("./config/middleware/passport");
app.use("/api/user", users);

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Moonlight/client/public/index.html"));
// });


let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dispatch";



mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});