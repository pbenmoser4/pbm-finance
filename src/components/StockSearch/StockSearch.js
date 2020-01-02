import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import faker from 'faker';

// import { appleStock } from '@vx/mock-data';

import SearchForm from './SearchForm';
import StockView from './StockView/StockView';

import { generateStockData } from '../../testData';
import { generateDummyData } from '../../actions';

const handleSubmit = formValues => {
  const {searchTerm} = formValues;
  console.log(searchTerm);
}

const stockData = generateStockData();
const companyInfo = {
  "name": faker.company.companyName(),
  "suffix": faker.company.companySuffix(),
  "bs": faker.company.bs()
}

const StockSearch = props => {
  console.log(props)
  return (
    <Fragment>
      <SearchForm onSubmit={handleSubmit}></SearchForm>
      <StockView data={stockData} companyInfo={companyInfo}></StockView>
    </Fragment>
  )
}

const mapStateToProps = state => {
  const ts = state.form.tickerSearch ? state.form.tickerSearch : null;

  return ({
    values: ts ? ts.values : null,
    submitSucceeded: ts ? ts.submitSucceeded : false,
    stock: state.stock
  })
}

export default connect(
  mapStateToProps, { generateDummyData }
)(StockSearch);
