import React, { Fragment } from 'react';

import { Statistic, Container } from 'semantic-ui-react';

import { timeFormat } from 'd3-time-format';

const formatDate = timeFormat("%m/%d/%y");

const getSummary = (data) => {
  const dateAccessor = d => new Date(d.date);
  const valueAccessor = d => d.close;
  // const min = (arr, fn) => Math.min(...arr.map(fn))
  // const max = (arr, fn) => Math.max(...arr.map(fn))

  const startData = data[0];
  const endData = data[data.length - 1];

  const startDate = dateAccessor(startData);
  // const startDateString = formatDate(dateAccessor(startData));
  const startValue = valueAccessor(startData);

  const endDate = dateAccessor(endData);
  // const endDateString = formatDate(dateAccessor(endData));
  const endValue = valueAccessor(endData);

  const change = endValue - startValue;
  const percentageChange = (change / startValue) * 100;

  const yearsElapsed = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
  const cagr = (Math.pow((endValue / startValue), (1/yearsElapsed)) - 1) * 100;

  return [
    {
      "size": "three",
      "title": "overview",
      "values": {
        "Start Value": {
          "value": startValue,
          "color": "black"
        },
        "End Value": {
          "value": endValue,
          "color": change > 0 ? 'teal': 'red'
        },
        "Change": {
          "value": change.toFixed(2),
          "color": change > 0 ? 'teal': 'red'
        },
      }
    },
    {
      "size": "two",
      "title": "change",
      "values": {
        "Percentage Change": {
          "value": percentageChange.toFixed(2) + '%',
          "color": change > 0 ? 'teal': 'red'
        },
        "CAGR": {
          "value": cagr.toFixed(2) + '%',
          "color": change > 0 ? 'teal': 'red'
        },
      }
    }
  ]
}

const renderStatistics = summary => {
  return summary.map(statDict => {
    return (
      <Statistic.Group key={statDict["title"]} widths={statDict["size"]} size="small">
        {Object.keys(statDict["values"]).map(key => {
          const val = statDict["values"][key];
          return (
            <Statistic key={key} color={val["color"]}>
              <Statistic.Value>{val["value"]}</Statistic.Value>
              <Statistic.Label>{key}</Statistic.Label>
            </Statistic>
          )
        })}
      </Statistic.Group>
    )
  })
}

const StockOverview = props => {
  const {data} = props;
  const summary = getSummary(data);

  return (
    <Fragment>
      <Container>
        {renderStatistics(summary)}
      </Container>
    </Fragment>
  )
}

export default StockOverview;
