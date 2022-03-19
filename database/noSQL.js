let questions = mongoose.Schema({
  id: { "bsonType": "uuid" },
  product_id: Number,
  question_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
});

let answers = mongoose.Schema({
  id: { "bsonType": "uuid" },
  question_id: Number,
  answer_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
});

let photos = mongoose.Schema({
  id: { "bsonType": "uuid" },
  answer_id: Number,
  photos: String,
});