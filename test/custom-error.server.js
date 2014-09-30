var validationMW = require('../');
var restify = require('restify');
var schema = require('./schema.json');

module.exports = function startServer() {
    var server = restify.createServer();
    var customValidatMW = validationMW.errorHandler(function(err, res, next) {
        res.setHeader('Error', err.code);
        next();
    });
    server.use(restify.bodyParser());
    server.post('/foo', [
        customValidatMW(schema),
        function(req, res) {
            res.send(200);
        }
    ]);
    server.listen(8080);
    return server;
};
