let request = require('supertest');
const { assert } = require('assert');
const { expect } = require('chai');
const superagent = require('superagent');
// const addAnswer = require('../server/controllers/addAnswer');
// const addQuestion = require('../server/controllers/addQuestion');
// const getAnswers = require('../server/controllers/getAnswers');
// const getQuestions = require('../server/controllers/getQuestions');
// const markAnswerHelpful = require('../server/controllers/markAnswerHelpful');
// const markQuestionHelpful = require('../server/controllers/markQuestionHelpful');
// const reportAnswer = require('../server/controllers/reportAnswer');
// const reportQuestion = require('../server/controllers/reportQuestion');
const server = require('../server/index');

request = request('http://localhost:3000');

const randomNumber = Math.floor(Math.random() * (100000 - 90000) + 90000);

describe('Vaild API calls', () => {
  describe('GET Questions', () => {
    it('responds with json - questions for a valid product', (done) => {
      request
        .get('/qa/questions/?product_id=64620')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
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
  });
  describe('PUT - Mark Question Helpful', () => {
    // it('marks a valid question helpful', (done) => {
    //   request
    //     .put('/qa/questions/96/helpful')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .expect(204)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log('err', err);
    //       } else {
    //         console.log('res.statusCode', res.statusCode);
    //         expect(res.statusCode).to.be.equal(204);
    //       }
    //       done();
    //     });
    // });
  });
  describe('PUT - Report a Question', () => {
    // it('reports a valid question', (done) => {
    //   request
    //     .put('/qa/questions/874/report')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /text/)
    //     .expect(204)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log('err', err);
    //       } else {
    //         expect(res.statusCode).to.be.equal(204);
    //       }
    //       done();
    //     });
    // });
  });
  describe('PUT - Mark Answer Helpful', () => {
    // it('marks a valid answer helpful', (done) => {
    //   request
    //     .put('/qa/answers/270/helpful')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .expect(204)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log('err', err);
    //       } else {
    //         expect(res.statusCode).to.be.equal(204);
    //       }
    //       done();
    //     });
    // });
  });
  describe('PUT - Report an Answer', () => {
    // it('reports a valid answer', (done) => {
    //   request
    //     .put('/qa/answers/48089/report')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /text/)
    //     .expect(204)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log('err', err);
    //       } else {
    //         expect(res.statusCode).to.be.equal(204);
    //       }
    //       done();
    //     });
    // });
  });
  describe('POST /qa/questions', () => {
    const validQuestion = {
      body: 'What fabric is the top made of?',
      name: 'yankeelover',
      email: 'yankeelover@gmail.com',
      product_id: '98000',
    };
    // it('should add a valid question for a valid product_id', (done) => {
    //   request
    //     .post('/qa/questions/')
    //     .send(validQuestion)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log('err', err);
    //       } else {
    //         console.log('res.statusCode', res.statusCode);
    //         expect(res.statusCode).to.be.equal(201);
    //       }
    //       done();
    //     });
    // });
  });
  describe('POST /qa/questions/:question_id/answers', () => {
    const validAnswer = {
      body: 'This is a great product',
      name: 'yankeelover',
      email: 'yankeelover@gmail.com',
      photos: [],
    };
    // it('should add a valid answer for a valid question_id', (done) => {
    //   request
    //     .post('/qa/questions/67599/answers')
    //     .send(validAnswer)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log('err', err);
    //       } else {
    //         console.log('res.statusCode', res.statusCode);
    //         expect(res.statusCode).to.be.equal(201);
    //       }
    //       done();
    //     });
    // });
  });
});

describe('Error handling for API calls', () => {
  describe('GET Questions', () => {
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
    it('Does not mark invalid question helpful and throws error', (done) => {
      request
        .put('/qa/questions/null/helpful')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });

    it('Does not mark a question, that does not exist, helpful and throws error', (done) => {
      request
        .put('/qa/questions/1000000000000/helpful')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });
  });
  describe('PUT - Report a Question', () => {
    it('Does not report an invalid question and throws error', (done) => {
      request
        .put('/qa/questions/null/report')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });

    it('Does not report a question, that does not exist, and throws error', (done) => {
      request
        .put('/qa/questions/100000000000/report')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });
  });
  describe('PUT - Mark Answer Helpful', () => {
    it('Does not mark invalid answer helpful and throws error', (done) => {
      request
        .put('/qa/answers/null/helpful')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            expect(res.statusCode).to.be.equal(400);
            console.log('res.statusCode', res.statusCode);
          }
          done();
        });
    });

    it('Does not mark an answer, that does not exist, helpful and throws error', (done) => {
      request
        .put('/qa/answers/100000000000/helpful')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });
  });
  describe('PUT - Report an Answer', () => {
    it('Does not report an invalid answer and throws error', (done) => {
      request
        .put('/qa/answers/null/report')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });

    it('Does not report an answer, that does not exist, and throws error', (done) => {
      request
        .put('/qa/answers/100000000000/report')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });
  });
  describe('POST /qa/questions', () => {
    const invalidQuestion = {
      body: 'What fabric is the top made of?',
      name: 'yankeelover',
      email: 'yankeelover@gmail.com',
      product_id: 'null',
    };

    it('should not add a question for an invalid product_id, and throw an error', (done) => {
      request
        .post('/qa/questions/')
        .send(invalidQuestion)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });
  });
  describe('POST /qa/questions/:question_id/answers', () => {
    const validAnswer = {
      body: 'This is a great product',
      name: 'yankeelover',
      email: 'yankeelover@gmail.com',
      photos: [],
    };
    it('should not add an answer for an invalid question_id', (done) => {
      request
        .post('/qa/questions/null/answers')
        .send(validAnswer)
        .end((err, res) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log('res.statusCode', res.statusCode);
            expect(res.statusCode).to.be.equal(400);
          }
          done();
        });
    });
  });
});
