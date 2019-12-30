import React, { useState } from 'react';

import ScalingArea from './ScalingArea';
import AreaBase from './Graphs/AreaBase';

import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import {
  appleStock,
  browserUsage,
  cityTemperature,
  groupDateValue,
  letterFrequency
} from '@vx/mock-data';

const StockGraph = props => {

  const data = appleStock;

  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipLeft, setTooltipLeft] = useState(null)
  const [tooltipTop, setTooltipTop] = useState(null)

  return (
    <div>
      <AreaBase
        height={400}
        width={700}
        margins={{
          top:0,
          right:0,
          bottom:0,
          left:0
        }}
        data={appleStock.slice(0,250)}
        xAccessor={d => new Date(d.date)}
        yAccessor={d => d.close}
        xScaleFunc={scaleTime}
        yScaleFunc={scaleLinear}
        curve={curveMonotoneX}
        includeGrid={true}
        showTooltip={(tooltipData, tooltipLeft, tooltipTop) => {
          setTooltipData(tooltipData.tooltipData);
          setTooltipLeft(tooltipData.tooltipLeft);
          setTooltipTop(tooltipData.tooltipTop);
        }}
        hideTooltip={() => console.log('left')}
        tooltipLeft={tooltipLeft}
        tooltipTop={tooltipTop}
        tooltipData={tooltipData}
      />
    </div>
  )
};

export default StockGraph;
