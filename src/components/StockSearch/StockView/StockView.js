import React, { Fragment } from 'react';

import { Segment } from 'semantic-ui-react';

import StockGraph from '../../Graphs/StockGraph';
import StockOverview from './StockOverview';
import StockHeader from './StockHeader';

const StockView = props => {
  const {data} = props;
  const {companyInfo} = props;

  return (
    <Fragment>
      <Segment attached="top" clearing>
        <StockHeader companyInfo={companyInfo} data={data.slice(data.length-2)}/>
      </Segment>
      <Segment attached style={{
          padding: 0,
          borderBottom: 0
        }}>
        <StockGraph data={data}></StockGraph>
      </Segment>
      <Segment attached="bottom" style={{borderTop:0}}>
        <StockOverview data={data}></StockOverview>
      </Segment>
    </Fragment>
  )
}

export default StockView;
