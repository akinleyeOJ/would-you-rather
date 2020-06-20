import { getInitialData, saveQuestionAnswer, saveQuestion} from "../datas/api";
import { setAuthedUser } from '../actions/authedUser'
import { getUsers } from '../actions/users'
import { loadQuestions } from "../actions/questions";
import { showLoading, hideLoading } from 'react-redux-loading-bar';


export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading())

    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(getUsers(users))
        dispatch(loadQuestions(questions))
        dispatch(hideLoading())
      })
  }
}


export function authenticate (authedId ) {
  return (dispatch) => {
    dispatch(setAuthedUser(authedId))
  }
}
