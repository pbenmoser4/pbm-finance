import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import appReducer from './appReducer';
import stockReducer from './stockReducer';

export default combineReducers({
  app: appReducer,
  form: formReducer,
  stock: stockReducer
});
