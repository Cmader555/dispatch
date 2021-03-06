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
    User.findOne({ userID: req.body.userID }).then(user => {
        if (user) {
            return res.status(400).json({ message: "UserID already exists" });
        } else {
            const newUser = new User({
                userID: req.body.userID,
                password: req.body.password,
                phone: req.body.phone, 
                firstName: req.body.firstName, 
                lastName: req.body.lastName
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
    const userID = req.body.userID;

    User.findOne({userID}, "userID").then( user => {

            res.json({
                user,
                token: tokenizer(req.user)
            })

    }).catch((err) => { console.log(err) });
});


module.exports = router;