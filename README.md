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
These are some things I'd like to add:

- Tests for express.
- Option to specify custom error-response handler.
- Option to define a schema for only the body.
