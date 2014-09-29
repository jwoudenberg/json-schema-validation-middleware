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

## Plans
Check the [issues](https://github.com/jwoudenberg/json-schema-validation-middleware/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement) for some planned features.
