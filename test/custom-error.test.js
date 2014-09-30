/* global describe, before, after, it */
var request = require('supertest');

describe('It validates incoming requests', function() {
    var server = null;

    before(function(done) {
        server = require('./custom-error.server')();
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
            .expect('Error', 0)
            .expect(200, done);
    });
});
