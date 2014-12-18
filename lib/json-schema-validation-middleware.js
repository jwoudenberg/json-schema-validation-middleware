var _ = require('lodash');
var tv4 = require('tv4');
var formats = require('tv4-formats');
var errorHandler = require('./error-handler');

tv4.addFormat(formats);
var errorCodes = _.invert(tv4.errorCodes);

function middlewareGenerator(schema) {
    return function validationMiddleware(req, res, next) {
        var result = tv4.validateResult(req, schema);
        if (result.valid) {
            return next();
        }
        var error = result.error;
        error.code = errorCodes[error.code];
        errorHandler(error, res, next);
    };
}

middlewareGenerator.configure = function configure(config) {
    if (config.errorHandler) {
        errorHandler = config.errorHandler;
    }
};

module.exports = middlewareGenerator;
module.exports.tv4 = tv4;
