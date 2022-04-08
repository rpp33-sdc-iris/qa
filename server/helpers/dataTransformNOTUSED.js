// const { readFile } = require('fs');
// const { createReadStream } = require('fs');
// const csvParser = require('csv-parser');
// const express = require('express');
// const parseCSV = require('./helpers/parseCSV');
// const questions = require('../database/index');

// eslint-disable-next-line no-console
// console.log(__dirname);

// const app = express();
// const port = 3000;

// let transformedData = [];
// let transformedQuestionsData = [];
// let transformedAnswersData = [];
// let transformedAnswersPhotosData = [];
// let qtransformed = false;
// let atransformed = false;
// let ptransformed = false;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Example app listening on port ${port}`);
// });

// const CHUNK_SIZE = 10000000; // 10MB
// async function transformQuestionsData() {
//   const qstream = createReadStream('./data/questions_copy.csv', 'utf8', { highWaterMark: CHUNK_SIZE });
//   for await (const questionsData of qstream) {
//     transformedQuestionsData = parseCSV(questionsData, 'questions');
//   }
//   qtransformed = true;
//   async function transformAnswersData() {
//     if (qtransformed) {
//       const astream = createReadStream('./data/answers_copy.csv', 'utf8', { highWaterMark: CHUNK_SIZE });
//       for await (const answersData of astream) {
//         transformedAnswersData = parseCSV(answersData, 'answers');
//       }
//       atransformed = true;
//       async function transformPhotosData() {
//         if (atransformed) {
//           const pstream = createReadStream('./data/answers_photos_copy.csv', 'utf8', { highWaterMark: CHUNK_SIZE });
//           for await (const photosData of pstream) {
//             transformedAnswersPhotosData = parseCSV(photosData, 'answers-photos');
//           }
//           ptransformed = true;
//         }
//         console.log('transformed data', transformedAnswersData[0].results[0]);
//       }
//       transformPhotosData();
//     }
//     console.log('transformed answers data', transformedAnswersData[0]);
//   }
//   transformAnswersData();
// }
// transformQuestionsData();

// async function transformAnswersData() {
//   if (qtransformed) {
//     const astream = createReadStream('./data/answers_copy.csv', 'utf8', { highWaterMark: CHUNK_SIZE });
//     for await (const answersData of astream) {
//       transformedAnswersData = parseCSV(answersData, 'answers');
//     }
//   }
//   console.log('transformed answers data', transformedAnswersData[0]);
// }
// transformAnswersData();

// createReadStream('./data/questions.csv', 'utf8')
//   // .pipe(csvParser())
//   .on('data', (questionsData) => {
//     // console.log('type of data', typeof (data));
//     transformedQuestionsData = parseCSV(questionsData, 'questions');
//   })
//   .on('end', () => {
//     console.log('questions data', transformedQuestionsData);
//     createReadStream('./data/answers.csv', 'utf8')
//     // .pipe(csvParser())
//       .on('data', (answersData) => {
//         // console.log('type of data', typeof (data));
//         // transformedAnswersData = parseCSV(answersData, 'answers');
//         // console.log('data', data);
//       })
//       .on('end', () => {
//         createReadStream('./data/answers_photos.csv', 'utf8')
//         // .pipe(csvParser())
//           .on('data', (answersPhotosData) => {
//             // console.log('type of data', typeof (data));
//             // transformedData = parseCSV(answersPhotosData, 'answers-photos');
//             // console.log('data', data);
//           })
//           .on('end', () => {
//             console.log('data transformation complete', transformedData);
//           });
//       });
//   });

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
