const { readFile } = require('fs');
const { createReadStream } = require('fs');
const csvParser = require('csv-parser');
const express = require('express');
const parseCSV = require('./helpers/parseCSV');
const questions = require('../database/index');

// eslint-disable-next-line no-console
console.log(__dirname);

const app = express();
const port = 3000;

let transformedData = [];
let transformedQuestionsData = [];
let transformedAnswersData = [];
let transformedAnswersPhotosData = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

createReadStream('./data/questions.csv', 'utf8')
  // .pipe(csvParser())
  .on('data', (questionsData) => {
    // console.log('type of data', typeof (data));
    transformedQuestionsData = parseCSV(questionsData, 'questions');
  })
  .on('end', () => {
    console.log('questions data', transformedQuestionsData);
    createReadStream('./data/answers.csv', 'utf8')
    // .pipe(csvParser())
      .on('data', (answersData) => {
        // console.log('type of data', typeof (data));
        // transformedAnswersData = parseCSV(answersData, 'answers');
        // console.log('data', data);
      })
      .on('end', () => {
        createReadStream('./data/answers_photos.csv', 'utf8')
        // .pipe(csvParser())
          .on('data', (answersPhotosData) => {
            // console.log('type of data', typeof (data));
            // transformedData = parseCSV(answersPhotosData, 'answers-photos');
            // console.log('data', data);
          })
          .on('end', () => {
            console.log('data transformation complete', transformedData);
          });
      });
  });

// readFile('./data/questions.csv', 'utf8', (questionsErr, questionsdata) => {
//   if (questionsErr) throw questionsErr;
//   readFile('./data/answers/answers-1.csv', 'utf8', (answersErr, answersData) => {
//     if (answersErr) throw answersErr.message;
//     readFile('./data/answers_photos_copy.csv', 'utf8', (photosErr, photosData) => {
//       if (photosErr) throw photosErr;
//       parseCSV(questionsdata, answersData, photosData);
//     });
//   });
// });
