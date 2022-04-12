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
  const id = req.query.product_id;
  const { count } = req.query;
  const { page } = req.query;

  // console.log(id, count, page);

  getQuestions(req, res).then((questions) => {
    // console.log('questions in server', questions);
    res.status('200').send(questions);
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const id = req.params.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  // console.log(count);

  getAnswers(req, res).then((answers) => {
    // console.log('questions in server', questions);
    res.status('200').send({
      question: id,
      page,
      count,
      results: answers.results,
    });
  });
});

app.post('/qa/questions', (req, res) => {
  addQuestion(req, res).then((questionAdded) => {
    console.log('returned value', questionAdded);
    if (questionAdded) {
      res.status('201').send('201 CREATED');
    } else {
      res.status('400').send('Error in adding question');
    }
  });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  addAnswer(req, res);
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  // console.log('this function was invoked');
  markQuestionHelpful(req, res).then((markedQuestionHelpful) => {
    // console.log('returned value', markedQuestionHelpful);
    if (markedQuestionHelpful) {
      res.status('204').send('Marked Helpful');
    } else {
      res.status('400').send('Error in marking question helpful');
    }
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  reportQuestion(req, res).then((questionReported) => {
    // console.log('returned value', questionReported);
    if (questionReported) {
      res.status('204').send('Question Reported');
    } else {
      res.status('400').send('Error in reporting question');
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  markAnswerHelpful(req, res).then((markedAnswerHelpful) => {
    // console.log('returned value', markedAnswerHelpful);
    if (markedAnswerHelpful) {
      res.status('204').send('Marked Helpful');
    } else {
      res.status('400').send('Error in marking answer helpful');
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  reportAnswer(req, res).then((answerReported) => {
    // console.log('returned value', answerReported);
    if (answerReported) {
      res.status('204').send('Answer Reported');
    } else {
      res.status('400').send('Error in reporting answer');
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
