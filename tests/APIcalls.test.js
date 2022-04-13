let request = require('supertest');

const assert = require('assert');

request = request('http://localhost:3000');

describe('GET /qa/questions', () => {
  it('responds with json - questions for a specific product', (done) => {
    request
      .get('/qa/questions/?product_id=2000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with json - answers for a specific product', (done) => {
    request
      .get('/qa/questions/1/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /qa/questions/:question_id/answers', () => {
  it('responds with json - answers for a specific product', (done) => {
    request
      .get('/qa/questions/1/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /qa/questions', () => {
  let question = {
    body: 'What fabric is the top made of?',
    name: 'yankeelover',
    email: 'yankeelover@gmail.com',
  };
  it('add a valid question for a valid product_id', (done) => {
    request
      .post('/qa/questions?product_id=2000')
      .send(question)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
