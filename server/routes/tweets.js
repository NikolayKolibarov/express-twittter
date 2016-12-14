let express = require('express'),
    router = express.Router(),
    tweetsController = require('../controllers/tweetsController'),
    auth = require('../middlewares/auth');

//router.get('/', (req, res) => {
//    console.log('');
//    tweetsController.allTweets(req, res);
//});

router.get('/create', auth.isAuthenticated, (req, res) => {
    tweetsController.showCreateTweet(req, res);
});

router.post('/create', auth.isAuthenticated, (req, res) => {
    tweetsController.createTweet(req, res);
});

router.get('/tags/:tag', (req, res) => {
    tweetsController.tweetsByTag(req, res);
});

router.get('/edit/:id', auth.isInRole('Admin'), (req, res) => {
    tweetsController.showEditTweet(req, res);
});

router.post('/edit/:id', auth.isInRole('Admin'), (req, res) => {
    tweetsController.editTweet(req, res);
});

router.post('/delete/:id', auth.isInRole('Admin'), (req, res) => {
    tweetsController.deleteTweet(req, res);
    res.redirect('/');
});

module.exports = router;
