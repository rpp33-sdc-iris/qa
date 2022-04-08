const express = require('express');
const addAnswer = require('./controllers/addAnswer');
const addQuestion = require('./controllers/addQuestion');
const getAnswers = require('./controllers/getAnswers');
const getQuestions = require('./controllers/getQuestions');
const markAnswerHelpful = require('./controllers/markAnswerHelpful');
const markQuestionHelpful = require('./controllers/markQuestionHelpful');
const reportAnswer = require('./controllers/reportAnswer');
const reportQuestion = require('./controllers/reportQuestion');

const app = express();
const port = 3000;

app.get('/qa/questions', (req, res) => {
  getQuestions(req);
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  getAnswers(req);
});

app.post('/qa/questions', (req, res) => {
  addQuestion(req);
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  addAnswer(req);
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  markQuestionHelpful(req);
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  reportQuestion(req);
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  markAnswerHelpful(req);
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  reportAnswer(req);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
