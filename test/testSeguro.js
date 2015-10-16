var should = require('chai').should(),
expect = require('chai').expect(),
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('Login',function () {
  it('should return a 200 respose',function (done) {
    api.get('/login')      
      .expect(200,done);
  });
});

describe('Seguro',function () {
  it('should return a 200 respose',function (done) {
    api.get('/api/seguros')
      .set('Accept','application/json')
      .expect(200,done);
  });
});
