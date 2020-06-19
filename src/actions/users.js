export const GET_USERS = 'GET_USERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION' 
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION'

export const getUsers = (users) => {
  return { type: GET_USERS, users,};
}

export const userAddQuestion = (users) => {
  return { type: USER_ADD_QUESTION, users,};
}

export const userAnswerQuestion = (users) => {
  return { type: USER_ANSWER_QUESTION, users,};
}