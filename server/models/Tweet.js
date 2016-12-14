let mongoose = require('mongoose');


let tagSchema = mongoose.Schema({
        tag: String
    }),
    tweetSchema = mongoose.Schema({
        _creator: {type: mongoose.Schema.ObjectId, ref: 'User'},
        message: {type: String, required: true},
        date: {type: Date, default: Date.now},
        tags: [tagSchema],
        views: Number
    });


module.exports = mongoose.model('Tweet', tweetSchema);
