const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const localStrategy = passport.authenticate("local", { session: false, });
// const userController = require("../../controllers/userController");

const tokenizer = user => {
    return "Bearer " + jwt.sign({
        sub: user.id
    },
        keys.secretOrKey
    )
}

// Load input validation
const validateRegisterInput = require("../../config/validation/register");
const validateLoginInput = require("../../config/validation/login");

const User = require("../../models").User;


// @route POST api/user/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json({ token: tokenizer(user) }))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


router.post("/login", localStrategy, function (req, res) {
    //res.json({ token: tokenizer(req.user) });
    const username = req.body.username;

    User.findOne({username}, "username").then( user => {

            res.json({
                user,
                token: tokenizer(req.user)
            })

    }).catch((err) => { console.log(err) });
});


module.exports = router;