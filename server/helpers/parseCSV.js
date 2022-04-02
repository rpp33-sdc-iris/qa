const allQuestions = [];

function findExistingProductIndex(item, string) {
  if (string === 'question') {
    const productIndex = allQuestions.findIndex(
      (element) => element.product_id === item[1],
    );
    return productIndex;
  }

  if (string === 'answer') {
    const productIndex = allQuestions.findIndex(
      (product) => product.results.some((question) => question.question_id === item[1]),
    );
    const questionIndex = allQuestions[productIndex].results.findIndex(
      (question) => question.question_id === item[1],
    );
    return [productIndex, questionIndex];
  }

  if (string === 'answer-photos') {
    const productIndex = allQuestions.findIndex(
      (product) => product.results.some((question) => Object.keys(question.answers).some(
        (id) => id === item[1],
      )),
    );
    if (productIndex > -1) {
      const questionIndex = allQuestions[productIndex].results.findIndex(
        (question) => Object.keys(question.answers).some(
          (id) => id === item[1],
        ),
      );
      return [productIndex, questionIndex];
    }
  }
}

function parseQuestionsCSV(questionsdata) {
  // console.log('question data', questionsdata);
  const questionsArray = questionsdata.split('\n');
  for (let i = 1; i < questionsArray.length; i += 1) {
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
      allQuestions[productIndex].results.push(tempObject);
    } else {
      allQuestions.push({
        product_id: eachQuestion[1],
        results: [tempObject],
      });
    }
  }
}

function parseAnswersCSV(answersData) {
  const answersArray = answersData.split('\n');
  for (let i = 1; i < answersArray.length; i += 1) {
    const eachAnswer = answersArray[i].split(',');
    const answerId = eachAnswer[0];
    const tempObject = {
      answer_id: eachAnswer[0],
      body: eachAnswer[2],
      date: eachAnswer[3],
      answerer_name: eachAnswer[4],
      helpfulness: eachAnswer[7],
      photos: [],
    };
    const indexArray = findExistingProductIndex(eachAnswer, 'answer');
    if (indexArray[0] > -1) {
      allQuestions[indexArray[0]].results[indexArray[1]].answers[answerId] = tempObject;
    }
  }
}

function parseAnswerPhotosCSV(photosData) {
  const answersPhotosArray = photosData.split('\n');
  for (let i = 1; i < answersPhotosArray.length; i += 1) {
    const eachPhoto = answersPhotosArray[i].split(',');
    const answerId = eachPhoto[1];
    const tempObject = {
      id: eachPhoto[0],
      url: eachPhoto[2],
    };
    const indexArray = findExistingProductIndex(eachPhoto, 'answer-photos') || [];
    if (indexArray[0] > -1) {
      allQuestions[indexArray[0]].results[indexArray[1]].answers[answerId].photos.push(tempObject);
    }
  }
  // console.log('allQuestions', allQuestions[0].results[0].answers[5].photos);
}

function parseCSV(data, string) {
  if (string === 'questions') {
    parseQuestionsCSV(data);
  } else if (string === 'answers') {
    parseAnswersCSV(data);
  } else if (string === 'answers-photos') {
    parseAnswerPhotosCSV(data);
  }

  // parseAnswersCSV(answersData);
  // parseAnswerPhotosCSV(photosData);
  // return allQuestions;
  // console.log('final array', allQuestions);
}

module.exports = parseCSV;
