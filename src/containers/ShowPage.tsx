import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { MovieHeader } from '../components/detail';
import { TimeLine } from '../components/show';
import { NavBar } from 'antd-mobile';
import { loadMovieDetail, loadShowInfo, loadCinemaList } from '../actions';

import * as React from 'react';
import '../components/show/styles/index.sass';

export interface ShowPageProps {
  loadMovieDetail: Function,
  loadShowInfo: Function,
  loadCinemaList: Function,
  goBack: Function,
  push: Function,
  mid: number,
  cid: number,
  movieDetail: any,
  showInfo: any,
  cinemaList: Array<any>
}

class ShowPage extends React.Component<ShowPageProps, any> {


  componentDidMount() {
    this.props.loadMovieDetail(this.props.mid);
    this.props.loadCinemaList();
    this.props.loadShowInfo(this.props.mid, this.props.cid);
  }

  getCinemaById(cinemaList: Array<any>, cid: number) {
    if (cinemaList.length > 0) {
      for (let i = 0; i < cinemaList.length; ++i) {
        if (cinemaList[i].id == cid) {
          return cinemaList[i];
        }
      }
    } else {
      return null;
    }
  }

  render() {
    const { movieDetail, showInfo, cinemaList, mid, cid } = this.props;
    const cinema = this.getCinemaById(cinemaList, cid);
    
    return (
      <div id="show-page">
        <NavBar iconName="left" onLeftClick={() => this.props.goBack()}>{cinema ? cinema.nm : ""}</NavBar>
        <div className="cinema-info">
          <div className="cinema-name">{ cinema ? cinema.nm : "" }</div>
          <p>{ cinema ? cinema.addr : ""}</p>
        </div>
        <MovieHeader detail={movieDetail ? movieDetail.detail : {}}/>
        <TimeLine showInfo={showInfo} push={this.props.push} mid={mid} cid={cid}/>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {

  const {
    data: { cinemaList, showInfo, movieDetail }
  } = state

  return {
    cinemaList,
    showInfo,
    movieDetail,
    mid: ownProps.match.params.movieId,
    cid: ownProps.match.params.cinemaId,
  }
}

export default connect(mapStateToProps, { loadShowInfo, loadMovieDetail,loadCinemaList, goBack, push })(ShowPage);