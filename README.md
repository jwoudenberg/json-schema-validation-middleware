[![NPM version](https://badge.fury.io/js/json-schema-validation-middleware.svg)](http://badge.fury.io/js/json-schema-validation-middleware)

# json-schema-validation-middleware
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

You can configure the middleware to use a custom error handler:

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
