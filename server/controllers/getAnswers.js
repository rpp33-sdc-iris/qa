const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const getAnswers = async (req, res) => {
  const questionId = Number(req.params.question_id);
  const { count } = req.query || 5;
  const { page } = req.query || 1;

  if (Number.isNaN(questionId)) {
    res.status(400).send('Question_id should be a number');
    return;
  }
  console.log('questionId', questionId);

  try {
    const answersPromise = await QuestionsCollection.aggregate([
      {
        $match: {
          question_id: questionId,
        },
      }, {
        $project: {
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
          results: {
            $filter: {
              input: '$answers',
              cond: {
                $eq: [
                  '$$this.reported', false,
                ],
              },
            },
          },
        },
      }, {
        $set: {
          results: {
            $map: {
              input: '$results',
              in: {
                answer_id: '$$this.id',
                body: '$$this.body',
                date: '$$this.date',
                answerer_name: '$$this.answerer_name',
                helpfulness: '$$this.helpfulness',
                photos: '$$this.photos',
              },
            },
          },
        },
      }, {
        $project: {
          _id: false,
        },
      },
    ]);
    const answers = await answersPromise.next();
    // console.log('answers', answers);
    if (answers) {
      res.status(200).json({
        question: questionId,
        page,
        count,
        results: answers.results,
      });
    } else {
      res.status(200).json({
        question: questionId,
        page,
        count,
        results: [],
      });
    }
  } catch (error) {
    console.log('error in finding answers', error);
    res.status(500).send('Database server error');
  }
  // returns a list of answers for a given question_id
  // does not include any reported answers
};

module.exports = getAnswers;
