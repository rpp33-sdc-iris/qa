const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;
let AnswersCollection;
let AnswersPhotosCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  AnswersCollection = getDb('answers');
  AnswersPhotosCollection = getDb('answers-photos');
  // console.log('questions collection accessed', QuestionsCollection);
});

const addAnswer = async (req, res) => {
  // Adds an answer for the given question_id
  // answer contains - answer_body, answerer_name, answerer_email, photos

  const questionId = Number(req.params.question_id);
  const answerBody = req.body.body;
  const answererName = req.body.name;
  const answererEmail = req.body.email;
  const answerPhotosQuery = req.body.photos;
  // Adds a question for the given product_id
  // question contains - question_body, asker_name, asker_email

  // console.log('req params', req.params);
  // console.log('req query', req.query);
  console.log('que', req);

  if (Number.isNaN(questionId)) {
    res.status(400).send('questionId should be a number');
    return;
  }

  let answerId;
  let answerPhotoId;
  const answerPhotos = [];

  try {
    await AnswersCollection.count().then((documentCount) => {
      console.log('number of answers in collection before', documentCount);
      answerId = documentCount + 1;
    });
  } catch (error) {
    console.log('error in getting answer count', error);
  }

  try {
    await AnswersPhotosCollection.count().then((documentCount) => {
      console.log('number of photos in collection before', documentCount);
      answerPhotoId = documentCount;
    });
  } catch (error) {
    console.log('error in getting answers-photos count', error);
  }

  if (Array.isArray(answerPhotosQuery)) {
    for (let i = 0; i < answerPhotosQuery.length; i += 1) {
      answerPhotoId += 1;
      const photosDocument = {};
      photosDocument.id = answerPhotoId;
      photosDocument.answer_id = answerId;
      photosDocument.url = answerPhotosQuery[i];
      answerPhotos.push(photosDocument);
    }
  }

  console.log('answerId', answerId, 'answerPhotoId', answerPhotoId);
  console.log('answer photos', answerPhotos, 'answerPhotoId', answerPhotoId);

  try {
    const added = await AnswersPhotosCollection.insertMany(answerPhotos);
    console.log('added photos in photos collection', added);
    // return added.acknowledged;
  } catch (error) {
    console.log('error in adding photos', error);
    // return false;
  }

  try {
    const added = await AnswersCollection.insertOne({
      id: answerId,
      question_id: questionId,
      body: answerBody,
      date: new Date(),
      answerer_name: answererName,
      answerer_email: answererEmail,
      photos: [],
    });
    console.log('added answer in answers collection', added);
  } catch (error) {
    console.log('error in adding answer', error);
  }

  let photos;

  try {
    const photosPromise = await AnswersPhotosCollection.aggregate([
      {
        $match: { answer_id: answerId },
      }, {
        $group: {
          _id: {
            answer_id: '$answer_id',
          },
          results: {
            $push: '$$ROOT',
          },
        },
      },
    ]);
    photos = (await photosPromise.next()).results;
    console.log('photos from answers photo collection', photos);
  } catch (error) {
    console.log('error in retrieving photos', error);
  }

  try {
    const added = await QuestionsCollection.updateOne(
      { question_id: questionId },
      {
        $push: {
          answers: {
            id: answerId,
            body: answerBody,
            date: new Date(),
            answerer_name: answererName,
            answerer_email: answererEmail,
            helpfulness: 0,
            reported: false,
            photos,
          },
        },
      },
    );
    if (added.acknowledged) {
      res.status(201).send('201 CREATED');
    } else {
      res.status(400).send('Error in adding answer');
    }
  } catch (error) {
    console.log('error in adding answer', error);
    res.status(500).send('Database server error');
  }
};

module.exports = addAnswer;
