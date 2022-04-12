const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const markAnswerHelpful = async (req, res) => {
  // Updates an answer to show it was found helpful.

  const answerId = Number(req.params.answer_id);

  try {
    const markedHelpful = await QuestionsCollection.updateOne(
      { },
      { $inc: { 'answers.$[answer].helpfulness': 1 } },
      { arrayFilters: [{ 'answer.id': { $eq: answerId } }] },
    );
    // console.log('reported', markedHelpful);
    return markedHelpful.acknowledged;
  } catch (error) {
    console.log('error in updating document', error);
    return false;
  }
};
module.exports = markAnswerHelpful;
