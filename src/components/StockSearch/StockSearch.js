import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import faker from 'faker';

// import { appleStock } from '@vx/mock-data';

import SearchForm from './SearchForm';
import StockView from './StockView/StockView';

import { generateStockData } from '../../testData';

const handleSubmit = formValues => {
  const {searchTerm} = formValues;
  console.log(searchTerm);
}

const StockSearch = props => {
  const stockData = generateStockData();
  const companyInfo = {
    "name": faker.company.companyName(),
    "suffix": faker.company.companySuffix(),
    "bs": faker.company.bs()
  }

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
    submitSucceeded: ts ? ts.submitSucceeded : false
  })
}

export default connect(
  mapStateToProps, {}
)(StockSearch);
