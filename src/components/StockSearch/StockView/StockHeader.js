import React from 'react';

import { Grid } from 'semantic-ui-react';

const StockHeader = props => {
  const {name, suffix} = props.companyInfo;
  const {data} = props;
  const lastClose = data[1].close;
  const lastCloseDate = new Date(data[1].date);

  const change = (data[1].close - data[0].close).toFixed(2);
  const percentChange = ((change / data[0].close) * 100).toFixed(2);

  const pre = change > 0 ? "+" : "";

  const color = change > 0 ? "green" : "red";

  const ticker = name.slice(0,4).toUpperCase();

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column style={{fontSize:"1.2em"}}>
          <span style={{fontWeight:"bold"}}>{`${name} ${suffix} `}</span>
          <span style={{color:"grey"}}>{`(^${ticker})`}</span>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <div>
            <span>{lastClose}</span>
            <span style={{color:`${color}`}}>{` ${pre}${change}`}</span>
            <span style={{color:`${color}`}}>{` (${pre}${percentChange}%)`}</span>
          </div>
          <div>
            <span style={{color: "grey", fontSize:"0.8em"}}>
              At Close {lastCloseDate.toDateString()}
            </span>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default StockHeader;
