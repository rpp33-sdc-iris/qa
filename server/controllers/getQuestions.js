const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const getQuestions = async (req, res) => {
  // console.log('req params', req.params);

  // console.log('req query', req.query);
  let productId = Number(req.query.product_id) - 64619;
  const { count } = req.query || 5;
  const { page } = req.query || 1;

  if (Number.isNaN(productId)) {
    res.status(400).send('Product_id should be a number');
    return;
  }

  try {
    const questionsPromise = await QuestionsCollection.aggregate([
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
    const questions = await questionsPromise.next();
    productId += 64619;
    // console.log('questions', questions);
    if (questions) {
      res.status(200).json({
        product_id: productId,
        results: questions.results,
      });
    } else {
      res.status(400).send('Questions data for Product_id does not exist. Check Product_id');
    }
  } catch (error) {
    console.log('error in finding questions', error);
    res.status(500).send('Database server error');
  }

  // returns a list of questions for a particular product
  // does not include any reported questions
};

module.exports = getQuestions;
