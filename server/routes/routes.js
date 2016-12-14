let users = require('../routes/users'),
    tweets = require('../routes/tweets');

module.exports = (app) => {

    app.get('/', (req, res) => {

        let Tweet = require('../models/Tweet');

        Tweet.find({}).sort({date: -1}).limit(100).populate('_creator').exec((err, tweets) => {
            let isAdmin = false;


            for (let tweet of tweets) {
                tweet.views++;
                tweet.save();
            }

            if (req.user) {
                for (let role of req.user.roles) {
                    if (role == 'Admin') {
                        isAdmin = true;
                    }
                }
            }

            res.render('home', {title: 'Home', tweets: tweets, isAdmin: isAdmin});

        });
    });

    app.use('/users', users);

    app.use('/tweets', tweets);
};