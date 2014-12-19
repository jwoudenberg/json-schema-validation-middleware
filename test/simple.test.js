/* global describe, before, after, it */
var request = require('supertest');

describe('It validates incoming requests', function() {
    var server = null;

    before(function(done) {
        server = require('./simple.server')();
        server.on('listening', done);
    });

    after(function(done) {
        server.close(done);
    });

    it('Accepts a valid request', function(done) {
        request(server)
            .post('/foo')
            .send({ foo: 'bar' })
            .expect(200, done);
    });

    it('Rejects an invalid request', function(done) {
        request(server)
            .post('/foo')
            .send({ foo: 5 })
            .expect(400, {
                code: 'validation.invalid_type./body/foo',
                message: '[/body/foo] Invalid type: number (expected string)'
            }, done);
    });

    it('Rejects an invalid request because of a missing property',
            function(done) {
        request(server)
            .post('/foo')
            .send({})
            .expect(400, {
                code: 'validation.object_required./body/foo',
                message: '[/body] Missing required property: foo'
            }, done);
    });
});
