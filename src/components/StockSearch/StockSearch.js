import React from 'react';
import { connect } from 'react-redux';

import SearchForm from './SearchForm';

const handleSubmit = formValues => {
  const {searchTerm} = formValues;
  console.log(searchTerm);
}

const StockSearch = props => {
  return (
    <SearchForm onSubmit={handleSubmit}></SearchForm>
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
