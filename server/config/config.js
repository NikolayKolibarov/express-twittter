let path = require('path');

let rootPath = path.normalize(path.join(__dirname, '../../'));


module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/twitter',
        port: 9999
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGO_DB_CONN_STRING,
        port: process.env.port
    }
};