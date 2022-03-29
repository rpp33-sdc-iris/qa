const allQuestion = [];

function findQuestionIndex(questionsArray, answer) {
  if (questionsArray.length > 0) {
    const questionIndex = questionsArray.findIndex(
      (element) => element.question_id === answer[1],
    );
    return questionIndex;
  }
  return -1;
}

function findExistingProductIndex(item, string) {
  if (string === 'question') {
    if (allQuestion.length > 0) {
      const productIndex = allQuestion.findIndex(
        (element) => element.product_id === item[1],
      );
      return productIndex;
    }
    return -1;
  } if (string === 'answer') {
    if (allQuestion.length > 0) {
      const productIndex = allQuestion.findIndex(
        (element) => findQuestionIndex(element.results, item),
      );
      return productIndex;
    }
    return -1;
  }
}

function parseQuestionsCSV(questionsdata) {
  const questionsArray = questionsdata.split('\n');
  const questionsHeaders = questionsArray.shift().split(',');

  // console.log(questionsArray);
  // console.log(questionsHeaders);
  // console.log(questionsArray);

  for (let i = 0; i < questionsArray.length; i += 1) {
    const eachQuestion = questionsArray[i].split(',');
    const tempObject = {
      question_id: eachQuestion[0],
      question_body: eachQuestion[2],
      question_date: eachQuestion[3],
      asker_name: eachQuestion[4],
      question_helpfulness: eachQuestion[7],
      reported: eachQuestion[6],
      answers: {},
    };
    const productIndex = findExistingProductIndex(eachQuestion, 'question');
    if (productIndex > -1) {
      allQuestion[productIndex].results.push(tempObject);
    } else {
      allQuestion.push({
        product_id: eachQuestion[1],
        results: [tempObject],
      });
    }
  }
  console.log('allQuestion', allQuestion);
}

function parseAnswersCSV(answersData) {
  const answersArray = answersData.split('\n');
  const answersHeaders = answersArray.shift().split(',');

  // console.log(questionsArray);
  // console.log(questionsHeaders);
  // console.log(questionsArray);

  for (let i = 0; i < answersArray.length; i += 1) {
    const eachAnswer = answersArray[i].split(',');
    const tempObject = {
      answer_id: eachAnswer[0],
      body: eachAnswer[2],
      date: eachAnswer[3],
      answerer_name: eachAnswer[4],
      helpfulness: eachAnswer[7],
      photos: [],
    };
    const productIndex = findExistingProductIndex(eachAnswer);
    if (productIndex > -1) {
      allQuestion[productIndex].results.push(tempObject);
    } else {
      allQuestion.push({
        product_id: eachAnswer[1],
        results: [tempObject],
      });
    }
  }
}

function parseAnswerPhotosCSV(photosData) {
  const questionsArray = photosData.split('\n');
  const questionsHeaders = questionsArray.shift().split(',');

  // console.log(questionsArray);
  // console.log(questionsHeaders);
  // console.log(questionsArray);

  for (let i = 0; i < questionsArray.length; i += 1) {
    const eachQuestion = questionsArray[i].split(',');
    const tempObject = {
      question_id: eachQuestion[0],
      question_body: eachQuestion[2],
      question_date: eachQuestion[3],
      asker_name: eachQuestion[4],
      question_helpfulness: eachQuestion[7],
      reported: eachQuestion[6],
      answers: {},
    };
    const productIndex = findExistingProductIndex(eachQuestion);
    if (productIndex > -1) {
      allQuestion[productIndex].results.push(tempObject);
    } else {
      allQuestion.push({
        product_id: eachQuestion[1],
        results: [tempObject],
      });
    }
  }
  // console.log('allQuestion', allQuestion[5]);
}

function parseCSV(questionsdata, answersData, photosData) {
  parseQuestionsCSV(questionsdata);
  parseAnswersCSV(answersData);
  parseAnswerPhotosCSV(photosData);
}

module.exports = parseCSV;
