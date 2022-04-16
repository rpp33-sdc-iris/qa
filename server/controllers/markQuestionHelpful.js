const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const markQuestionHelpful = async (req, res) => {
  const questionId = Number(req.params.question_id);
  // Updates a question to show it was found helpful
  // console.log('req', req.params);
  // console.log('questionId', questionId);

  if (Number.isNaN(questionId)) {
    res.status(400).send('questionId should be a number');
    return;
  }

  try {
    const markedHelpful = await QuestionsCollection.updateOne({
      question_id: questionId,
    }, {
      $inc: {
        question_helpfulness: 1,
      },
    });
    // console.log(markedHelpful);

    if (markedHelpful.modifiedCount !== 0) {
      res.status(204).end();
    } else {
      res.status(400).send('Error in marking question helpful');
    }
  } catch (error) {
    console.log('error in updating document', error);
    res.status(500).send('Database server error');
  }
};

module.exports = markQuestionHelpful;
