export const GET_USERS = 'GET_USERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION' 
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION'

export const getUsers = (users) => {
  return { type: GET_USERS, users,};
}

function userAddQuestion (question){
  return{
    type: USER_ADD_QUESTION,
    question,
  }
}

export function handleUserAddQuestion (info) {
  return (dispatch) => {
    dispatch(userAddQuestion(info))
  }
}

function userAnswerQuestion (authedUser, qid, answer){
  return{
    type: USER_ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  }
}

export function handleUserAnswerQuestion (authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(userAnswerQuestion(authedUser, qid, answer))
  }
}