'use strict';
var tv4 = require('tv4');

function middlewareGenerator(schema) {
    return function(req, res, next) {
        var result = tv4.validateResult(req, schema);
        if (result.valid) {
            return next();
        }
        var error = result.error;
        res.send(400, {
            message: error.message,
            path: error.dataPath,
            code: 0
        });
    };
}

module.exports = middlewareGenerator;
