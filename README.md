# ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# System Design Capstone Project

The goal was to replace the existing monolithic API for an e-commerce website (Project Atelier) with a service-oriented backend architecture that can support the full (retail product) data set for the project and can scale to meet the demands of production level traffic.

# Setup

1. Start a MongoDb Database
```
# run MongoDB as a macOS service
brew services start mongodb-community@5.0

# To verify that MongoDB is running, perform one of the following:
brew services list

# To begin using MongoDB
mongosh
```

2. Set up the Node/Express server
```
$ npm install

# Update the url and dbName variable inside database/index.js
url = 'mongodb://127.0.0.1:27017'
dbName = 'q&a';

```
3. Start the Node/Express server
 ```
$ npm run server

```
# Performance Parameters

## Service Level Agreement
- Throughput: 100 RPS 
- Latency: 2000ms 
- Error rate: <1% rate

## API Service Performance
- [x] Throughput: 8000 RPS 
- [x]  Latency: 60ms 
- [x]  Error rate: <1% rate

# API Endpoints
This API service serves Questions & Answers data to the front-end of an e-commerce website. Listed below are the endpoints routes built, serving data from a Mongodb database with data loaded from .csv files.

# Questions and Answers API
### List Questions

`GET /qa/questions`
Retrieves a list of questions for a particular product.  This list *does not* include any reported questions.
Range of valid product ids - [64620, 97000]

Parameters

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| product_id | integer | Specifies the product for which to retrieve questions.    |
| page       | integer | Selects the page of results to return.  Default 1.        |
| count      | integer | Specifies how many results per page to return. Default 5. |

Response

`Status: 200 OK `

```json
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": 0,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": 0,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```



### Answers List

Returns answers for a given question. This list *does not* include any reported answers.

`GET /qa/questions/:question_id/answers`

Parameters

| Parameter   | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
| question_id | integer | Required ID of the question for wich answers are needed |

Query Parameters

| Parameter   | Type    | Description                                               |
| ----------- | ------- | --------------------------------------------------------- |
| page        | integer | Selects the page of results to return.  Default 1.        |
| count       | integer | Specifies how many results per page to return. Default 5. |

Response

`Status: 200 OK `

```json
{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}
```



### Add a Question

Adds a question for the given product

`POST /qa/questions`

Body Parameters

| Parameter  | Type | Description                      |
| ---------  | ---- | -------------------------------- |
| body       | text | Text of question being asked     |
| name       | text | Username for question asker      |
| email      | text | Email address for question asker |
| product_id | integer | Required ID of the Product for which the question is posted |

Response

`Status: 201 CREATED `



### Add an Answer

Adds an answer for the given question

`POST /qa/questions/:question_id/answers`

Parameters

| Parameter   | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
| question_id | integer | Required ID of the question to post the answer for |

Body Parameters

| Parameter | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| body      | text   | Text of question being asked                        |
| name      | text   | Username for question asker                         |
| email     | text   | Email address for question asker                    |
| photos    | [text] | An array of urls corresponding to images to display |

Response

`Status: 201 CREATED `



### Mark Question as Helpful

Updates a question to show it was found helpful.

`PUT /qa/questions/:question_id/helpful`

Parameters

| Parameter   | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| question_id | integer | Required ID of the question to update |

Response

`Status: 204 NO CONTENT `



### Report Question

Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

`PUT /qa/questions/:question_id/report`

Parameters

| Parameter   | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| question_id | integer | Required ID of the question to update |

Response

`Status: 204 NO CONTENT `



### Mark Answer as Helpful

Updates an answer to show it was found helpful.

`PUT /qa/answers/:answer_id/helpful`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| answer_id | integer | Required ID of the answer to update |

Response

`Status: 204 NO CONTENT `



### Report Answer

Updates an answer to show it has been reported.  Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

`PUT /qa/answers/:answer_id/report`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| answer_id | integer | Required ID of the answer to update |

Response

`Status: 204 NO CONTENT `
