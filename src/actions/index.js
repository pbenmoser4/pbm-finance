import {
  GET_APP_STATE
} from './types';

export const getAppState = () => dispatch => {
  dispatch({
    type: GET_APP_STATE,
    payload: {}
  })
}
