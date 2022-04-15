const { connectDb, getDb } = require('../../database/index');

let QuestionsCollection;

connectDb(() => {
  QuestionsCollection = getDb('questions');
  // console.log('questions collection accessed', QuestionsCollection);
});

const addQuestion = async (req, res) => {
  const productId = Number(req.body.product_id);
  const questionBody = req.body.body;
  const askerName = req.body.name;
  const askerEmail = req.body.email;
  // Adds a question for the given product_id
  // question contains - question_body, asker_name, asker_email
  // console.log('req', req);

  if (Number.isNaN(productId)) {
    res.status(400).send('Product_id should be a number');
    return;
  }

  let questionId;

  try {
    await QuestionsCollection.count().then((documentCount) => {
      console.log('number of questions in collection before', documentCount);
      questionId = documentCount + 1;
    });
  } catch (error) {
    console.log('error in getting question count', error);
  }

  // console.log('questionId', questionId);

  try {
    const added = await QuestionsCollection.insertOne({
      product_id: productId,
      question_id: questionId,
      question_body: questionBody,
      asker_name: askerName,
      asker_email: askerEmail,
      question_date: new Date(),
      reported: false,
      question_helpfulness: 0,
    });

    // console.log('added', added);
    if (added.acknowledged) {
      res.status(201).send('201 CREATED');
    } else {
      res.status(400).send('Error in adding question');
    }
  } catch (error) {
    console.log('error in adding question', error);
    res.status(500).send('Database server error');
  }
};

module.exports = addQuestion;
