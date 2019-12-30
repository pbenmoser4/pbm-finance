import React from 'react';
import { ParentSize } from '@vx/responsive';
import Area from './Area';

const ScalingArea = props => {
  const {width, height} = props;
  return (
    <div style={{display:'flex',
      flex:1,
      flexDirection:"column",
      overflow: "hidden",
      padding: "1rem",
      border:"1px solid lightgray",
      width: width,
      height: height
    }}>
      <div className="app-graph" style={{
          display:'flex', flex:1
        }}>
        <ParentSize className="graph-container">
          {({width: w, height: h}) => {
            return (
              <Area
                width={w}
                height={h}
                margin={{top:0, left:0, bottom:0, right:0}}
              />
            )
          }}
        </ParentSize>
      </div>
    </div>
  )
};

export default ScalingArea;
