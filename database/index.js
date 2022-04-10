// Connect using a MongoClient instance
const { MongoClient } = require('mongodb');

// Connection url
const url = 'mongodb://127.0.0.1:27017';
// Database Name
const dbName = 'q&a';
// Connect using MongoClient
let db;
// const mongoClient = new MongoClient(url);

// async function run() {
//   try {
//     await mongoClient.connect();
//     db = mongoClient.db(dbName);
//     console.log('connectiong to database successful', db.collection('questions'));
//     module.exports = db;
//   } catch (err) {
//     console.log('error in connecting to database', err);
//   }
// }
// run();
// mongoClient.connect((err, client) => {
//   if (err) {
//     console.log('error in connecting to database', err);
//     return;
//   }
//   db = client.db(dbName);
//   console.log('connectiong to database successful', db);
// });

// function getDb() {
//   return MongoClient.connect(`${url}/${dbName}`).then((db) => {
//     console.log('db', db.collection('collection', db.collection('questions')));
//   });
// }

// getDb();

// module.exports = getDb;

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

module.exports = { connectDb, getDb };
