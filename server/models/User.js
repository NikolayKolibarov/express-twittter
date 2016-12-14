let mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');
let userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    roles: [String],
    tweets: [
        {
            type: mongoose.Schema.ObjectId, ref: 'Tweet'
        }
    ]
});


userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = (attemptPassword, hashedUserPassword) => {
    return bcrypt.compareSync(attemptPassword, hashedUserPassword);
};

module.exports = mongoose.model('User', userSchema);
