const express = require("express");
const bodyParser = require("body-parser");
// const redis = require('./config/redis');
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./middleware/passport")

let dotenv = require('dotenv');
let env = dotenv.config();




// create express app
const app = express();

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

app.use(cookieSession({
  name: "google-auth-session",
  keys:['keys1', 'keys2']
}))

app.use(passport.initialize())
app.use(passport.session())

// setup the server port
const port = process.env.PORT;

// define root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));


    app.get('/redirect/google',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


// import employee routes
const userRoutes = require("./routes/user");

// create employee routes
app.use("blog/api/v1/user", userRoutes);

// listen to the port
app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
  // redis.quit();
});
