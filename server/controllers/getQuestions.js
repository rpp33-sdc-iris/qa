const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

// connectDb();

// getDb().then((db) => {
//   QuestionsCollection = db.collection('questions');
// });

// const QuestionsCollection = db.collection('questions');

const getQuestions = async (req, res) => {
  const productId = Number(req.query.product_id);
  const { count } = req.query || 5;
  const { page } = req.query || 1;

  try {
    const questions = await QuestionsCollection.aggregate([
      {
        $match: {
          product_id: productId,
        },
      }, {
        $project: {
          _id: false,
          'answers._id': false,
          'answers.question_id': false,
          'answers.date_written': false,
          'answers.answerer_email': false,
          'answers.helpful': false,
        },
      }, {
        $project: {
          'answers.photos._id': false,
          'answers.photos.answer_id': false,
        },
      }, {
        $project: {
          question_id: true,
          product_id: true,
          question_body: true,
          question_date: true,
          asker_name: true,
          question_helpfulness: true,
          reported: true,
          answers: {
            $arrayToObject: {
              $map: {
                input: '$answers',
                in: {
                  k: {
                    $toString: '$$this.id',
                  },
                  v: '$$this',
                },
              },
            },
          },
        },
      }, {
        $group: {
          _id: {
            product_id: '$product_id',
          },
          results: {
            $push: '$$ROOT',
          },
        },
      }, {
        $project: {
          'results.product_id': false,
        },
      }, {
        $project: {
          results: {
            $filter: {
              input: '$results',
              cond: {
                $eq: [
                  '$$this.reported', false,
                ],
              },
            },
          },
        },
      }, {
        $project: {
          product_id: '$_id.product_id',
          results: true,
        },
      }, {
        $project: {
          _id: false,
        },
      },
    ]);
    const qs = await questions.next();
    // console.log('questions', qs);
    return qs;
  } catch (error) {
    console.log('error in finding questions', error);
  }

  // returns a list of questions for a particular product
  // does not include any reported questions
};

module.exports = getQuestions;
