import request from 'supertest'
import app from '../app.js'

describe('Router /:page', function () {
    describe('POST /:page', function () {
        it('should return 200', function () {
            request(app)
                .post('/testpage')
                .set('header', 'application/json')
                .send({
                    content: 'test constest',
                })
                .expect(200)
        });
    });

    describe('GET /:page', function () {
        it('responds with json', function (done) {
            request(app)
                .get('/hi')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});