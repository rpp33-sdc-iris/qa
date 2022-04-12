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
    // console.log('reported', reported);
    return reported.acknowledged;
  } catch (error) {
    console.log('error in updating document', error);
    return false;
  }
};

module.exports = reportQuestion;
