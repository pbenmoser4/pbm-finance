import React, { useState, useRef, useEffect, Fragment } from 'react';

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
  const baseWidth = 600;

  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipLeft, setTooltipLeft] = useState(null);
  const [tooltipTop, setTooltipTop] = useState(null);
  const [width, setWidth] = useState(baseWidth);

  const graphRef = useRef(null);

  useEffect(() => {
    setWidth(graphRef.current ? graphRef.current.offsetWidth : width);

    function handleResize() {
      setWidth(graphRef.current.offsetWidth);
    }

    window.addEventListener('resize', handleResize);

    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  }, [width, graphRef]);

  return (
    <Fragment>
      <div className="stock-graph" ref={graphRef}>
        <AreaBase
          height={400}
          width={width}
          margins={{
            top:0,
            right:0,
            bottom:0,
            left:0
          }}
          data={data}
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
    </Fragment>
  )
};

export default StockGraph;
