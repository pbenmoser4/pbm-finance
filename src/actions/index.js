import faker from 'faker';

import {
  GET_APP_STATE,
  GET_STOCK,
  GENERATE_STOCK_DATA
} from './types';

import { generateStockData } from '../testData';

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

export const generateDummyData = () => dispatch => {
  const stockData = generateStockData();
  const companyInfo = {
    "name": faker.company.companyName(),
    "suffix": faker.company.companySuffix(),
    "bs": faker.company.bs()
  }

  dispatch({
    type: GENERATE_STOCK_DATA,
    payload: {
      "data": stockData,
      "companyInfo": companyInfo
    }
  });
}
