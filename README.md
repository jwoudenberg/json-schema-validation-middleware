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

## Development

### Style
An `.editorconfig` and `.jshintrc` enforce a coding style.

### Tasks
Gulp is used as a task runner. Install it globally using `npm install -g gulp`.
To see a list of gulp commands, run `gulp help`.

### Git hooks
Upon commiting or pushing, a git hook wil automatically runt code linting or tests.
