let request = require('supertest');

const assert = require('assert');

request = request('http://localhost:3000');

describe('GET Questions', () => {
  it('responds with json - questions for a valid product', (done) => {
    request
      .get('/qa/questions/?product_id=64620')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with error for invalid product', (done) => {
    request
      .get('/qa/questions/?product_id=null')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(400, done);
  });

  it('responds with error for product_id out of bounds', (done) => {
    request
      .get('/qa/questions/?product_id=10000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(400, done);
  });
});

describe('GET Answers', () => {
  it('responds with json - answers for a valid product', (done) => {
    request
      .get('/qa/questions/1/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with error for invalid question_id', (done) => {
    request
      .get('/qa/questions/null/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(400, done);
  });

  it('responds with error for product_id out of bounds', (done) => {
    request
      .get('/qa/questions/1000000000000/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(400, done);
  });
});

describe('PUT - Mark Question Helpful', () => {
  it('marks a valid question helpful', (done) => {
    request
      .put('/qa/questions/46/helpful')
      .send({ question_id: 46 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204, done);
  });
});

// describe('POST /qa/questions', () => {
//   let question = {
//     body: 'What fabric is the top made of?',
//     name: 'yankeelover',
//     email: 'yankeelover@gmail.com',
//   };
//   it('add a valid question for a valid product_id', (done) => {
//     request
//       .post('/qa/questions?product_id=2000')
//       .send(question)
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
// });
