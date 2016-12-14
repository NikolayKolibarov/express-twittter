let express = require('express'),
    router = express.Router(),
    usersController = require('../controllers/usersController'),
    auth = require('../middlewares/auth');

router.get('/register', auth.isGuest, (req, res) => {
    usersController.showRegisterPage(req, res);
});

router.post('/register', auth.isGuest, (req, res) => {
    usersController.register(req, res);
});

router.get('/login', auth.isGuest, (req, res) => {
    usersController.showLoginPage(req, res);
});

router.post('/login', auth.isGuest, (req, res) => {
    usersController.login(req, res);
});

router.post('/logout', (req, res) => {
    usersController.logout(req, res);
});

router.get('/profile/:username', auth.isAuthenticated, (req, res) => {
    usersController.showProfilePage(req, res);
});

router.get('/admins', auth.isInRole('Admin'), (req, res) => {
    usersController.allAdmins(req, res);
});

router.post('/admins/add', auth.isInRole('Admin'), (req, res) => {
    usersController.addAdminRole(req, res);
});

module.exports = router;
