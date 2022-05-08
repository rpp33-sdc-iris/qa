// Connect using a MongoClient instance
const { MongoClient } = require('mongodb');
require('dotenv').config();

// console.log('process.env', process.env);

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@54.82.224.190:27017/qa?authSource=admin`;
const dbName = 'qa';
let db;

function connectDb(callback) {
  if (db) {
    return callback();
  }
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, database) => {
    if (err) {
      return console.log('error in connecting to the database', err);
    }
    db = database.db(dbName);
    console.log('connected to database q&a');
    callback();
  });
}

function getDb(collectionName) {
  return db.collection(collectionName);
}

connectDb(() => {
  const QuestionsCollection = getDb('questions');
  // console.log('QuestionsCollection', QuestionsCollection);
  QuestionsCollection.createIndex({
    question_id: 1,
    reported: 1,
    question_helpfulness: 1,
    'answers.id': 1,
    'answers.reported': 1,
    'answers.helpfulness': 1,
    'answers.photos': 1,
  });
  // console.log('questions collection accessed', QuestionsCollection);
});

module.exports = { connectDb, getDb, db };

// mongodb://Admin:Baikunth1@3.80.51.37:27017/?authMechanism=DEFAULT&authSource=admin
