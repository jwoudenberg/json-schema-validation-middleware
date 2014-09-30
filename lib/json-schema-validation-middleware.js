var _ = require('lodash');
var tv4 = require('tv4');

function middlewareGenerator(schema) {
    var options = this || {};
    return function validationMiddleware(req, res, next) {
        var result = tv4.validateResult(req, schema);
        if (result.valid) {
            return next();
        }
        var error = result.error;
        var errorHandler = options.errorHandler || defaultErrorHandler;
        errorHandler(error, res, next);
    };
}

function defaultErrorHandler(error, res) {
    res.send(400, {
        message: error.message,
        path: error.dataPath,
        code: 0
    });
}

/**
 * Create a new middlewareGenerator function with an extended options object.
 */
middlewareGenerator._extendOptions = function _extendOptions(extraOptions) {
    var options = this._options || {};
    var newOptions = _.extend({}, options, extraOptions);
    //Make the options available from the generator by binding them.
    var newMiddlewareGenerator = middlewareGenerator.bind(newOptions);
    //Make the options avaiable from the outside the function for extension.
    newMiddlewareGenerator._options = newOptions;
    return newMiddlewareGenerator;
};

/**
 * Alow the user to create a custom error handler.
 */
middlewareGenerator.errorHandler = function addErrorHandler(errorHandler) {
    return this._extendOptions({
        errorHandler: errorHandler
    });
};

module.exports = middlewareGenerator;
