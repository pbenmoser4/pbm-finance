import {
  GET_APP_STATE,
  GET_STOCK
} from './types';

export const getAppState = () => dispatch => {
  dispatch({
    type: GET_APP_STATE,
    payload: {}
  })
}

export const getStock = ticker => async dispatch => {
  dispatch({
    type: GET_STOCK,
    payload: "stock valaues"
  });
}
