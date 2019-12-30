import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import StockSearch from './StockSearch/StockSearch';
import StockGraph from './StockGraph';

const App = props => {
  return (
    <Fragment>
      <Header ></Header>
      <Container>
        <StockSearch></StockSearch>
        <StockGraph></StockGraph>
      </Container>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return state.form.tickerSearch
    ? {
      values: state.form.tickerSearch.values,
      submitSucceeded: state.form.tickerSearch.submitSucceeded
    }
    : {};
}

export default connect(
  mapStateToProps,
  {}
)(App);
