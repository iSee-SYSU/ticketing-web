import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { MovieHeader } from '../components/detail';
import { TimeLine } from '../components/show';
import { NavBar, Modal } from 'antd-mobile';
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

  state = {
    modal: false
  }

  componentDidMount() {
    this.props.loadMovieDetail(this.props.mid);
    this.props.loadCinemaList();
    this.props.loadShowInfo(this.props.mid, this.props.cid);
    setTimeout(() => {
      if (JSON.stringify(this.props.showInfo) === "{}") {
        this.setState({ modal: true });
      }
    }, 1000);
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

  onClose = () => {
    this.setState({ model: false });
  }

  render() {
    const { movieDetail, showInfo, cinemaList, mid, cid } = this.props;
    const cinema = this.getCinemaById(cinemaList, cid);
    
    return (
      <div id="show-page">
        <Modal
          title="提示"
          transparent
          maskClosable={false}
          visible={this.state.modal}
          onClose={this.onClose}
          footer={[{ text: '确定', onPress: () => { this.props.goBack(); this.onClose(); } }]}
        >
          该影院暂无该影片排场
        </Modal>
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