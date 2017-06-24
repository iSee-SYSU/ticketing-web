import * as React from 'react';
import request from '../../utils/request';
import { Tabs } from 'antd-mobile';
import './styles/index.sass';

export interface TimeLineProps {
  showInfo: any,
  cid: number,
  mid: number,
  push: Function
}

const TabPane = Tabs.TabPane;


export const TimeLine = (props: TimeLineProps) => {


  const { showInfo, push, mid, cid } = props;

  const toSeatsPage = (sid: number, sdate: string) => {
    push(`/seats/movie/${mid}/cinema/${cid}/show/${sid}/date/${sdate}`);
  }

  let tabs = [];
  for (let key in showInfo) {
    tabs.push(
      <TabPane tab={key} key={tabs.length + 1}>
        <table>
          <tbody>
            {
              showInfo[key].map((item, index) => {
                return (
                  <tr key={ index }>
                    <td className="time">
                      <div className="time-wrap">
                        <strong>{ item.tm }</strong>
                        <em>{ item.end } 结束</em>
                      </div>
                    </td>
                    <td className="info">
                      <div className="ver">{ item.lang } { item.tp }</div>
                      <div className="addr">{ item.th }</div>
                    </td>
                    <td className="price">
                      40元
                    </td>
                    <td className="buy">
                      <a href="javascipts:void(0)" className="buy-btn" onClick={() => toSeatsPage(item. showId, item.showDate)}>选座购票</a>
                    </td>
                  </tr>
                )
              })
            }
            
          </tbody>
        </table>
      </TabPane>
    )
  }

  return (
    <div>
      <Tabs defaultActiveKey="1">
        { tabs }
      </Tabs>
    </div>
  );
  
}
