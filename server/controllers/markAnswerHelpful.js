const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const markAnswerHelpful = async (req, res) => {
  // Updates an answer to show it was found helpful.

  const answerId = Number(req.params.answer_id);
  // console.log('answerId', answerId);

  if (Number.isNaN(answerId)) {
    res.status(400).send('answerId should be a number');
    return;
  }

  try {
    const markedHelpful = await QuestionsCollection.updateOne(
      { 'answers.id': answerId },
      { $inc: { 'answers.$.helpfulness': 1 } },
      // { arrayFilters: [{ 'answer.id': { $eq: answerId } }] },
    );
    // console.log('reported', markedHelpful);
    if (markedHelpful.modifiedCount !== 0) {
      res.status(204).send('Answer Marked Helpful');
    } else {
      res.status(400).send('Error in marking answer helpful');
    }
  } catch (error) {
    console.log('error in updating document', error);
    res.status(500).send('Database server error');
  }
};
module.exports = markAnswerHelpful;
