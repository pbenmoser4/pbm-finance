import React, { Fragment } from 'react';

import { Container, Grid } from 'semantic-ui-react';

const StockHeader = props => {
  const {name, suffix} = props.companyInfo;
  const {data} = props;
  const lastClose = data[1].close;
  const change = (data[1].close - data[0].close).toFixed(2);
  const percentChange = ((change / data[0].close) * 100).toFixed(2);
  const pre = change > 0 ? "+" : "";
  const color = change > 0 ? "green" : "red";

  console.log(data);
  const ticker = name.slice(0,4).toUpperCase();

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <span style={{fontWeight:"bold"}}>{`${name} ${suffix} `}</span>
          <span style={{color:"grey"}}>{`(^${ticker})`}</span>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <span>{lastClose}</span>
          <span style={{color:`${color}`}}>{` ${pre}${change}`}</span>
          <span style={{color:`${color}`}}>{` (${pre}${percentChange}%)`}</span>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default StockHeader;
