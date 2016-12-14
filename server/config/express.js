let express = require('express'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),
    hbs = require('express-handlebars'),
    passport = require('passport');

module.exports = (config, app) => {
    app.set('views', config.rootPath + 'server/views');
    app.set('view engine', 'hbs');
    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'master',
        layoutsDir: config.rootPath + 'server/views/layouts/'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(fileUpload());
    app.use(session({secret: 'nnk', saveUninitialized: false, resave: false}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user
        }

        next()
    });
    app.use('/public', express.static(config.rootPath + '/public'));
    app.use('/node_modules', express.static(config.rootPath + "/node_modules"));
    app.use('/bower_components', express.static(config.rootPath + "/bower_components"));
};


