const { readFile } = require('fs');

const express = require('express');

const parseCSV = require('./helpers/parseCSV');

// eslint-disable-next-line no-console
console.log(__dirname);

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

readFile('./data/questions.csv', 'utf8', (questionsErr, questionsdata) => {
  if (questionsErr) throw questionsErr;
  readFile('./data/answers_copy.csv', 'utf8', (answersErr, answersData) => {
    if (answersErr) throw answersErr.message;
    readFile('./data/answers_photos_copy.csv', 'utf8', (photosErr, photosData) => {
      if (photosErr) throw photosErr;
      parseCSV(questionsdata, answersData, photosData);
    });
  });
});
