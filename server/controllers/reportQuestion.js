const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const reportQuestion = async (req, res) => {
  // Updates a question to show it was reported
  // This action does not delete the question,
  // but the question will not be returned in a GET request

  const questionId = Number(req.params.question_id);
  // console.log('questionId', questionId);

  if (Number.isNaN(questionId)) {
    res.status(400).send('questionId should be a number');
    return;
  }

  try {
    const reported = await QuestionsCollection.updateOne(
      { question_id: questionId },
      {
        $set:
         {
           reported: true,
         },
      },
    );

    if (reported.modifiedCount !== 0) {
      res.status(204).send('Question Reported');
    } else {
      res.status(400).send('Error in reporting the question');
    }
  } catch (error) {
    console.log('error in updating document', error);
    res.status(500).send('Database server error');
  }
};

module.exports = reportQuestion;
