var validationMW = require('../');
var restify = require('restify');
var schema = require('./schema.json');

module.exports = function startServer() {
    var server = restify.createServer();
    server.use(restify.bodyParser());
    server.post('/foo', [
        validationMW(schema),
        function(req, res) {
            res.send(200);
        }
    ]);
    server.listen(8080);
    return server;
};
