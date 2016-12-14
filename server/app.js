let express = require('express'),
    app = express(),
    env = process.env.NODE_ENV || 'development';

let config = require('./config/config')[env];

require('./config/database')(config);
require('./config/express')(config, app);
require('./routes/routes')(app);
require('./config/passport')();
require('./seeders/databaseSeeder')();

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
