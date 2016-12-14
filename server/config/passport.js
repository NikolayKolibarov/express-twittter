let passport = require('passport');
let LocalPassport = require('passport-local');
let User = require('../models/User');

module.exports = () => {
    passport.use(new LocalPassport({
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            User
                .findOne({username: username})
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false);
                    }

                    return done(null, user)
                })
        }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id)
        }
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (!user) {
                return done(null, false);
            }

            return done(null, user)
        })
    });
};
