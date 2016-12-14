let mongoose = require('mongoose'),
    Tweet = require('../models/Tweet');

function allTweets(req, res) {
    Tweet.find({}).sort({date: -1}).populate('_creator').exec((err, tweets) => {
        res.render('tweet-all', {title: `All Tweets`, tweets: tweets});
    });
}

function showCreateTweet(req, res) {
    res.render('tweet-create', {title: 'Create Tweet', errors: req.session.errors});
    req.session.errors = null;
}

function createTweet(req, res) {
    let newTweetData = req.body;

    if (!newTweetData.message || newTweetData.message.length > 140) {

        if (!newTweetData.message) {
            req.session.errors = [{message: 'Message is required.'}];
        }

        if (newTweetData.message.length > 140) {
            req.session.errors = [{message: 'Message must be no more than 140 characters.'}];
        }

        res.redirect('/tweets/create');
    } else {

        let tags = newTweetData.message.match(/(#)\w+/g);

        let tweet = new Tweet();
        tweet._creator = req.user._id;
        tweet.message = newTweetData.message;
        tweet.views = 0;

        if (tags) {
            for (let tag of tags) {
                tag = tag.replace('#', '');
                tweet.tags.push({tag: tag.toLowerCase()});
            }
        }

        tweet.save(err => {
            if (err) {
                console.log(err);
            }
        });

        res.redirect('/');
    }

}

function tweetsByTag(req, res) {
    let tagName = req.params.tag.toLowerCase();

    Tweet.find({'tags.tag': tagName}).sort({date: -1}).sort({date: -1}).limit(100).populate('_creator').exec((err, tweets) => {
        if (err) {
            console.log(err);
        }

        res.render('tweet-tag', {tag: tagName, tweets: tweets});
    });
}

function showEditTweet(req, res) {
    let tweetId = req.params.id;

    let tweet = Tweet.findById(tweetId, (err, tweet) => {
        res.render('tweet-edit', {title: 'Edit Tweet', tweet: tweet, errors: req.session.errors});
        req.session.errors = null;
    });

}

function editTweet(req, res) {
    let editedTweetData = req.body;
    let tweetId = req.params.id;

    if (!editedTweetData.message || editedTweetData.message.length > 140) {

        if (!editedTweetData.message) {
            req.session.errors = [{message: 'Message is required.'}];
        }

        if (editedTweetData.message.length > 140) {
            req.session.errors = [{message: 'Message must be no more than 140 characters.'}];
        }

        res.redirect('/tweets/edit/' + tweetId);
    } else {
        let tags = editedTweetData.message.match(/(#)\w+/g);

        Tweet.findById(tweetId, (err, tweet) => {
            if (err) {
                console.log(err);
            }

            tweet.message = editedTweetData.message;
            tweet.tags = [];

            if (tags) {
                for (let tag of tags) {
                    tag = tag.replace('#', '');
                    tweet.tags.push({tag: tag});
                }
            }

            tweet.save(err => {
                if (err) {
                    console.log(err);
                }
            });

            res.redirect('/');

        });


    }
}

function deleteTweet(req, res) {
    let tweetId = req.params.id;

    Tweet.findByIdAndRemove(tweetId).exec();


}

module.exports = {
    allTweets,
    showCreateTweet,
    createTweet,
    tweetsByTag,
    showEditTweet,
    editTweet,
    deleteTweet
};