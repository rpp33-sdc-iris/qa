const express = require('express');
const bodyParser = require('body-parser');
const addAnswer = require('./controllers/addAnswer');
const addQuestion = require('./controllers/addQuestion');
const getAnswers = require('./controllers/getAnswers');
const getQuestions = require('./controllers/getQuestions');
const markAnswerHelpful = require('./controllers/markAnswerHelpful');
const markQuestionHelpful = require('./controllers/markQuestionHelpful');
const reportAnswer = require('./controllers/reportAnswer');
const reportQuestion = require('./controllers/reportQuestion');

const app = express();
const port = 5000;

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin", "http://localhost:5000');
  // res.header('Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE');
  // res.header('Content-Type: application/json');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/qa/questions', getQuestions);

app.get('/qa/questions/:question_id/answers', getAnswers);

app.post('/qa/questions', addQuestion);

app.post('/qa/questions/:question_id/answers', addAnswer);

app.put('/qa/questions/:question_id/helpful', markQuestionHelpful);

app.put('/qa/questions/:question_id/report', reportQuestion);

app.put('/qa/answers/:answer_id/helpful', markAnswerHelpful);

app.put('/qa/answers/:answer_id/report', reportAnswer);

app.get('/', (req, res) => {
  console.log('yo');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
