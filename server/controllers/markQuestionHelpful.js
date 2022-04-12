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
  try {
    const markedHelpful = await QuestionsCollection.updateOne({
      question_id: questionId,
    }, {
      $inc: {
        question_helpfulness: 1,
      },
    });
    return markedHelpful.acknowledged;
  } catch (error) {
    console.log('error in updating document', error);
    return false;
  }
};

module.exports = markQuestionHelpful;
