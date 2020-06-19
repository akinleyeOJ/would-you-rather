import { GET_USERS, USER_ADD_QUESTION, USER_ANSWER_QUESTION } from "../actions/users";


export default function users(state = {}, action) {
    switch (action.type) {
      case GET_USERS:
        return { ...state, ...action.users };
      case USER_ADD_QUESTION:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            questions: [...state[action.authedUser].questions, action.qid]
          }
        };
      case USER_ANSWER_QUESTION:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer
            }
          }
        };
      default:
        return state;
    }
  }