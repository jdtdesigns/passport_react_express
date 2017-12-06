const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../modules/passport');

User.find({}).then(users => console.log(users));

/* GET home page. */
router.post('/register', (req, res) => {
    User.create(req.body)
        .then(result => {
            passport.authenticate('local')
            (req, res, result => {
                res.send({ user: req.user, success: 1 });
            });
        });
});

router.post('/login', (req, res) => {
    passport.authenticate('local')
    (req, res, result => {
        res.send({ user: req.user, success: 1 });
    });
});

module.exports = router;
