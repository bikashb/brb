const should = require('should');
const request = require('supertest');

const app = require('../../app');

describe('signin API', function() {
  it('sigin in', function(done) {
     request(app)
    .post('/api/v1/signin')
    .send({username:'san@xyz.com',password:'12345'})
    .expect(201, done);
  });
