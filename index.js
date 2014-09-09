var Config = require('./config'),
socket = require('socket.io')(8080),
Path = require('path'),
Hapi = require('hapi'),
Mongoose = require('mongoose'),
Royce = require('./royce'),
controllers = require('./controllers'),
routes = require('./routes'),
bcrypt = require('bcrypt');



var server = new Hapi.Server('127.0.0.1', 80, { files: { relativeTo: Path.join(__dirname, 'public') } });
Mongoose.connect(Config.db.url + '/' + Config.db.db);
server.route(routes);
server.start();