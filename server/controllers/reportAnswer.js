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

  try {
    const reported = await QuestionsCollection.updateOne(
      { },
      { $set: { 'answers.$[answer].reported': true } },
      { arrayFilters: [{ 'answer.id': { $eq: answerId } }] },
    );
    // console.log('reported', reported);
    return reported.acknowledged;
  } catch (error) {
    console.log('error in updating document', error);
    return false;
  }
};

module.exports = reportAnswer;
