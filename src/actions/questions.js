import {saveQuestionAnswer, saveQuestion} from "../datas/api"
import {handleUserAddQuestion, handleUserAnswerQuestion} from "../actions/users";

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return (dispatch) => {
return saveQuestion({optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(handleUserAddQuestion(question))
      })
  }
}

export function loadQuestions (questions) {
  return {
    type: LOAD_QUESTIONS,
    questions,
  }
}

function addQuestionAnswer (authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser, 
    qid, 
    answer
  }
}

export function handleAnswerQuestion (authedUser, qid, answer ) {
  return (dispatch) => {
    return saveQuestionAnswer({
      qid, 
      authedUser, 
      answer
    })
    .then(({authedUser, qid, answer}) => {
      dispatch(addQuestionAnswer(authedUser, qid, answer))
      dispatch(handleUserAnswerQuestion(authedUser, qid, answer))
    })
  }
}