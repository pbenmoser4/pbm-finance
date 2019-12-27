import {
  GET_APP_STATE
} from '../actions/types';

export default (state={}, action) => {
  switch(action.type) {
    case GET_APP_STATE:
      return state;
    default:
      return state;
  }
}
