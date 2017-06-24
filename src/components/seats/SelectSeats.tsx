import * as React from 'react';
import request from '../../utils/request';
import './styles/index.sass';

export interface SelectSeatsProps {
  seatsInfo: Array<any>,
  select: Function,
  selectedSeats: Array<any>
}

export const SelectSeats = (props: SelectSeatsProps) => {

  // const { seatsInfo, selectedSeats } = props;
  const { selectedSeats } = props;

  const seatsInfo = [{
    seatRows: [
      {
        seats: [
          { seatNo: '123456', type: "N"},
          { seatNo: '12346', type: "N"},
          { seatNo: '1256', type: "N"}
        ]
      },
      {
        seats: [
          { seatNo: '13456', type: "N"},
          { seatNo: '12345635', type: "N"},
          { seatNo: '123456123', type: "N"}
        ]
      },
      {
        seats: [
          { seatNo: '12345664', type: "N"},
          { seatNo: '12345643345', type: "N"},
          { seatNo: '123456222', type: "N"}
        ]
      }
    ],
    sectionName: ""
  }]

  const seatRows = seatsInfo.length > 0 ? seatsInfo[0].seatRows : [];

  const seats = seatRows.map((item, index) => {
    return (
      <div key={index}>
        {
          item.seats.map(s => {
            let link = (
              <span 
                className="seat" 
                key={s.seatNo} >
              </span>
            );

            if (s.type == "N") {
              link = (
                <a 
                  href="javascript:void(0)" 
                  className={selectedSeats.indexOf(s.seatNo) == -1 ? "seat active" : "seat selected" }
                  key={s.seatNo}
                  onClick={ () => props.select(s.seatNo) } >
                </a>
                )
            } 
            else if (s.type == "LK") {
              link = (
                <a 
                  href="javascript:void(0)" 
                  className="seat disabled" 
                  key={s.seatNo} 
                  onClick={ () => props.select(s) } >
                </a>
              );
            } else { 
              link = (
                <span 
                  className="seat" 
                  key={s.seatNo} >
                </span>
              );
            }

            return link;
          })
        }
        
      </div>
    )
  })

  return (
    <div className="main">
      <h3>{ seatsInfo.length > 0 ? seatsInfo[0].sectionName : ""}</h3>
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
