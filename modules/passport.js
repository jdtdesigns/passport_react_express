var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User = require('../models/User');

// User.create({
//     email: 'jdtadlock@yahoo.com',
//     password: 'password'
// }).then(() => console.log('created'));

// User.find({}).then(users => console.log(users));

passport.use(new Strategy(
    {
        usernameField: 'email'
    },
    function (email, password, cb) {
        User.findOne({email: email}, (err, user) => {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});


module.exports = passport;