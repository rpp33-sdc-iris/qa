const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.1:27017/q&a');
// console.log('db connected');

const photosSchema = mongoose.Schema({
  // id: { bsonType: 'uuid' },
  answer_id: Number,
  photos: String,
});

const answersSchema = mongoose.Schema({
  // id: { bsonType: 'uuid' },
  question_id: Number,
  answer_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
  photos: [photosSchema],
});

const questionsSchema = mongoose.Schema({
  // id: { bsonType: 'uuid' },
  product_id: Number,
  question_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: { answersSchema },
});

const questions = mongoose.model('Questions', questionsSchema);

module.exports = questions;
