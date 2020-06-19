import { GET_USERS, USER_ADD_QUESTION, USER_ANSWER_QUESTION } from "../actions/users";


export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.users };
      case USER_ADD_QUESTION:
        const { id, author } = action;
        return {
          ...state, [author]: {...state[author],
            questions: state[author].questions.concat(id)
          }
        };
      
      case USER_ANSWER_QUESTION:
        const { authedUser, qid, answer } = action;
        return {
          ...state,
          [authedUser]: {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]: answer
            }
          }
        };
      
    default:
      return state;
  }
}