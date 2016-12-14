let mongoose = require('mongoose'),
    User = require('../models/User');

module.exports = () => {

    User.find({}).exec((err, users) => {
        if (err) {
            console.log(err);
        } else {
            if (users.length == 0) {
                let adminUser = new User();
                adminUser.username = 'admin';
                adminUser.password = adminUser.encryptPassword('admin');
                adminUser.roles = ['Admin'];
                adminUser.save();

                console.log('users collection seeded')
            }
        }
    });

};