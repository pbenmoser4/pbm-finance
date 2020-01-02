import React, { Fragment } from 'react';
import { AreaClosed, Bar, Line } from '@vx/shape';
import { GridRows, GridColumns } from '@vx/grid';
import { localPoint } from '@vx/event';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

const AreaBase = props => {

  const formatDate = timeFormat("%b %d, '%y");
  const min = (arr, fn) => Math.min(...arr.map(fn));
  const max = (arr, fn) => Math.max(...arr.map(fn));
  const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];
  const bisectDate = bisector(d => new Date(d.date)).left;

  const { data } = props;
  const { width, height, margins } = props;
  const { xAccessor, yAccessor } = props;
  const { xScaleFunc, yScaleFunc } = props;
  const { curve } = props;
  const { showTooltip, hideTooltip } = props;
  const { tooltipLeft, tooltipTop, tooltipData } = props;
  const includeGrid = props.includeGrid && true;

  const xMax = width - margins.left - margins.right;
  const yMax = height - margins.top - margins.bottom;

  const xScale = xScaleFunc({
    range: [0, xMax],
    domain: extent(data, xAccessor)
  });
  const yScale = yScaleFunc({
    range: [yMax, 0],
    domain: [0, max(data, yAccessor) + yMax / 3],
  })

  const renderGrid = includeGrid => {
    if (includeGrid) {
      return (
        <Fragment>
          <GridRows
            lineStyle={{pointerEvents: 'none'}}
            scale={yScale}
            width={xMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
            />
          <GridColumns
            lineStyle={{pointerEvents: 'none'}}
            scale={xScale}
            height={yMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
            />
        </Fragment>
      )
    } else {
      return null
    }
  }



  const handleTooltip = ({event, data, xAccessor, yAccessor, yScale}) => {
    const { x } = localPoint(event);
    const xData = xScale.invert(x);
    // find the index of the date in the data array
    const index = bisectDate(data, xData, 1)
    const d0 = data[index-1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = xData - xAccessor(d0.date) > xAccessor(d1.date) - xData ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close)
    });
  }

  return (
    <div className="area-base">
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#32deaa" rx={0} />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        {renderGrid(includeGrid)}
        <AreaClosed
          data={data}
          x={d => xScale(xAccessor(d)) + margins.left}
          y={d => yScale(yAccessor(d)) - margins.bottom}
          yScale={yScale}
          strokeWidth={1}
          stroke={'url(#gradient)'}
          fill={'url(#gradient)'}
          curve={curve}
          />
        <Bar
          x={0} y={0}
          width={width} height={height}
          fill="transparent"
          rx={5}
          data={data}
          onTouchStart={event=>
            handleTooltip({event, xAccessor, xScale, yScale, data:data})
          }
          onTouchMove={event =>
            handleTooltip({event, xAccessor, xScale, yScale, data:data})
          }
          onMouseMove={event =>
            handleTooltip({event, xAccessor, xScale, yScale, data:data})
          }
          onMouseLeave={event => hideTooltip()}
          />
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y:yMax }}
              stroke="rgba(92,119,235,1.000)"
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
              strokeDasharray="2,2"
              />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
              />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="rgba(92,119,235, 1.000)"
              stroke="white"
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
              />
          </g>
        )}
      </svg>
      {tooltipData && (
        <div>
          <Tooltip
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={{
              backgroundColor: 'rgba(92,119,235,1.000)',
              color: 'white'
            }}
            >
            {`$${yAccessor(tooltipData)}`}
          </Tooltip>
          <Tooltip
            top={yMax - 14}
            left={tooltipLeft - 14}
            style={{ transform: 'translateX(-50%)'}}
            >
            {formatDate(xAccessor(tooltipData))}
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default withTooltip(AreaBase);
