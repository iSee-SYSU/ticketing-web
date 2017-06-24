import * as React from 'react';
import request from '../../utils/request';
import './styles/index.sass';

export interface SelectSeatsProps {
}

export const SelectSeats = (props: SelectSeatsProps) => {


  return (
    <div className="main">
      <h3></h3>
      <div className="wrapper">
        <div className="scroller">
          <div className="item">
            <div className="c-tips">
              <span>屏幕中央</span>
            </div>
            <div>
              <span className="seat"></span>
              <a href="javascript:void(0)" className="seat active"></a>
              <a href="javascript:void(0)" className="seat disabled"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
