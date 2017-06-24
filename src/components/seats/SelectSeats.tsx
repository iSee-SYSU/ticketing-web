import * as React from 'react';
import request from '../../utils/request';
import './styles/index.sass';

export interface SelectSeatsProps {
  seatsInfo: Array<any>,
  select: Function,
}

export const SelectSeats = (props: SelectSeatsProps) => {

  const { seatsInfo } = props;

  const seatRows = seatsInfo.length > 0 ? seatsInfo[0].seatRows : [];

  const seats = seatRows.map((item, index) => {
    return (
      <div key={index}>
        {
          item.seats.map(s => {
            if (s.type == "N") {
              return (
                <a 
                  href="javascript:void(0)" 
                  className="seat active" 
                  key={s.seatNo} 
                  >
                </a>
                )
            } 
            else if (s.type == "LK") {
              return (
                <a 
                  href="javascript:void(0)" 
                  className="seat disabled" 
                  key={s.seatNo} 
                  >
                </a>
                )
            } else { 
              return (
                <span 
                  className="seat" 
                  key={s.seatNo} 
                  >
                </span>
                )
            }
          })
        }
        
      </div>
    )
  })

  return (
    <div className="main">
      <h3>7号厅</h3>
      <div className="wrapper">
        <div className="scroller">
          <div className="item">
            <div className="c-tips">
              <span>屏幕中央</span>
            </div>
            { seats }
          </div>
        </div>
      </div>
    </div>
  );
  
}
