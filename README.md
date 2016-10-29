# json-schema-validation-middleware
[![NPM version](http://img.shields.io/npm/v/json-schema-validation-middleware.svg?style=flat-square)](https://www.npmjs.com/package/json-schema-validation-middleware)
[![Build status](https://img.shields.io/travis/jwoudenberg/json-schema-validation-middleware/master.svg?style=flat-square)](https://travis-ci.org/jwoudenberg/json-schema-validation-middleware)
[![Dependencies](https://img.shields.io/gemnasium/jwoudenberg/json-schema-validation-middleware.svg?style=flat-square)](https://gemnasium.com/jwoudenberg/json-schema-validation-middleware)

Validate your incoming requests using a json schema.
Tested with [restify](http://mcavage.me/node-restify/).

## Usage
Create your restify server and your json schema.
Adding a validation middleware to an endpoint couldn't be simpler:

```javascript
var validationMW = require('json-schema-validation-middleware');
server.post('/foo', [
    validationMW(schema),
    myRealHandler
]);
```

You can optionally configure the middleware to use a custom error handler:

```javascript
validationMW.configure({
    errorHandler: function (error, res, next) {
        //Do whatever you like here, for instance:
        res.send(400);
    }
});
```

### Formats
The middleware uses the [tv4-formats](https://github.com/ikr/tv4-formats) library, so the formats defined there are supported.

### Accessing tv4
You can access tv4 directly, for instance to add schema definitions or formatters:
```
var tv4 = require('json-schema-validation-middleware').tv4;
```

## Development

### Style
An `.editorconfig` and `.jshintrc` enforce a coding style.

### Tasks
Gulp is used as a task runner. Install it globally using `npm install -g gulp`.
To see a list of gulp commands, run `gulp help`.

### Git hooks
Upon commiting or pushing, a git hook wil automatically runt code linting or tests.
