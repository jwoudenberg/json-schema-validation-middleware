var _ = require('lodash');
var tv4 = require('tv4');

var errorCodes = _.invert(tv4.errorCodes);
var options = {};

function middlewareGenerator(schema) {
    return function validationMiddleware(req, res, next) {
        var result = tv4.validateResult(req, schema);
        if (result.valid) {
            return next();
        }
        var error = result.error;
        error.code = errorCodes[error.code];
        var errorHandler = options.errorHandler || defaultErrorHandler;
        errorHandler(error, res, next);
    };
}

function defaultErrorHandler(error, res) {
    res.send(400, {
        code: error.code,
        path: error.dataPath,
        message: error.message
    });
}

middlewareGenerator.configure = function configure(newOptions) {
    options = _.extend({}, options, newOptions);
};

module.exports = middlewareGenerator;
