// Connect using a MongoClient instance
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'q&a';
let db;

function connectDb(callback) {
  if (db) {
    return callback();
  }
  MongoClient.connect(url, (err, database) => {
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

module.exports = { connectDb, getDb, db };
