const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../modules/passport');

// User.find({}).remove().then(users => console.log(users));

/* GET home page. */
router.post('/register', (req, res) => {
    User.create(req.body)
        .then(result => {
            passport.authenticate('local')
            (req, res, function (result) {
                if ( req.user ) 
                    res.send({info: req.user, success: 1});
                else
                    res.send({info: null, success: 0});
            });
        });
});

router.post('/login', (req, res) => {
    passport.authenticate('local')
    (req, res, function (result) {
        if (req.user)
            res.send({ info: req.user, success: 1 });
        else
            res.send({ info: null, success: 0 });
    });
});

module.exports = router;
