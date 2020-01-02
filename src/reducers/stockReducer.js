import {
  GET_STOCK,
  GENERATE_STOCK_DATA
} from '../actions/types';

export default (state={}, action) => {
  switch(action.type) {
    case GET_STOCK:
      return action.payload;
    case GENERATE_STOCK_DATA:
      return action.payload;
    default:
      return state;
  }
}
