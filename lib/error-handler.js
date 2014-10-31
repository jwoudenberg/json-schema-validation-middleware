var format = require('util').format;

//Custom formatters for certain types of tv4 errors. Each formatter is keyed by
//the tv4 error code and defined as a function which takes the error object and
//returns a code.
var ERROR_FORMATTERS = {
    OBJECT_REQUIRED: function (error){
        return [
            'validation',
            'object_required',
            [error.dataPath, error.params.key].join('/')
        ].join('.');
    }
};

function defaultFormatter(error) {
    var code = [
        'validation',
        error.code,
        error.dataPath
    ].join('.').toLowerCase();
    return code;
}

function errorHandler(error, res) {
    var path = error.dataPath;
    var message = format('[%s] %s', path, error.message);
    var errorFormatter = ERROR_FORMATTERS[error.code] || defaultFormatter;
    var code = errorFormatter(error);
    res.send(400, {
        message: message,
        code: code
    });
}

module.exports = errorHandler;
