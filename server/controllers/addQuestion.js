const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const addQuestion = async (req, res) => {
  const productId = Number(req.query.product_id);
  const questionBody = req.body.body;
  const askerName = req.body.name;
  const askerEmail = req.body.email;
  // Adds a question for the given product_id
  // question contains - question_body, asker_name, asker_email

  let questionId;

  try {
    await QuestionsCollection.count().then((documentCount) => {
      console.log('number of questions in collection before', documentCount);
      questionId = documentCount + 1;
    });
  } catch (error) {
    console.log('error in getting question count', error);
  }

  console.log('questionId', questionId);

  try {
    const added = await QuestionsCollection.insertOne({
      product_id: productId,
      question_id: questionId,
      question_body: questionBody,
      asker_name: askerName,
      asker_email: askerEmail,
    });
    return added.acknowledged;
  } catch (error) {
    console.log('error in adding question', error);
    return false;
  }
};

module.exports = addQuestion;
