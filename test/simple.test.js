/* global describe, before, after, it */
var request = require('supertest');

describe('It validates incoming requests', function() {
    var server = null;

    before(function(done) {
        server = require('./test-server')();
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
                code: 0,
                path: '/body/foo',
                message: 'invalid type: number (expected string)'
            }, done);
    });
});
