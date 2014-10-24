var restify = require('restify');
var schema = require('./schema.json');

module.exports = function startServer() {
    //Delete any cached already configured validationMW
    delete require.cache[require.resolve('../')];
    var validationMW = require('../');

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
