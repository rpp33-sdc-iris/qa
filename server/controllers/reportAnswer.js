const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const reportAnswer = async (req, res) => {
  // Updates a question to show it was reported
  // This action does not delete the question,
  // but the question will not be returned in a GET request

  const answerId = Number(req.params.answer_id);
  // console.log('answerId', answerId);

  if (Number.isNaN(answerId)) {
    res.status(400).send('answerId should be a number');
    return;
  }

  try {
    const reported = await QuestionsCollection.updateOne(
      { 'answers.id': answerId },
      { $set: { 'answers.$.reported': true } },
      // { arrayFilters: [{ 'elem.id': { $eq: answerId } }] },
    );
    // console.log('reported', reported);
    if (reported.modifiedCount !== 0) {
      res.status(204).send('Answer Reported');
    } else {
      res.status(400).send('Error in reporting the answer');
    }
  } catch (error) {
    console.log('error in updating document', error);
    res.status(500).send('Database server error');
  }
};

module.exports = reportAnswer;
