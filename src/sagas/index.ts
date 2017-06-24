import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../reducers/selectors';
import { api } from '../services'

/***************************** Subroutines ************************************/

/**
 * 可复用的异步加载
 */
function* getData(data, apiFn, field: string, params = {}) {
  yield put( data.request(params) )
  const { response, error } = yield call(apiFn, params);
  console.log({res: response, err: error});
  if (response) {
    yield put( data.success(params, response, field) );
  } else {
    yield put( data.failure(params, error) );
  }
}

/**
 * 获取今日上映列表
 */
function* loadMovieList() {
  // cache
  const data = yield select(selectors.getMovieList);
  if (data.length <= 0) {
    const moveListAction = actions.movieList;
    const getMovieList = getData.bind(null, moveListAction, api.getMovieList);
    yield call(getMovieList, 'movieList');
  }
}

/**
 * 电影详情
 */
function* loadMovieDetail(id: number) {
  const data = yield select(selectors.getMovieDetail);
  if (!data || data.detail.id != id) {
    const movieDetailAction = actions.movieDetail;
    const getMovieDetail = getData.bind(null, movieDetailAction, api.getMovieDetail);
    yield call(getMovieDetail, 'movieDetail', { id });
  }
}

/**
 * 获取所有区域列表
 */
function* loadAreaList() {
  // cache
  const data = yield select(selectors.getAreaList);
  if (data.length <= 0) {
    const areaListAction = actions.areaList;
    const getAreaList = getData.bind(null, areaListAction, api.getAreaList);
    yield call(getAreaList, 'areaList');
  }
}

/**
 * 获取所有影院列表
 */
function* loadCinemaList() {
  // cache
  const data = yield select(selectors.getCinemaList);
  if (data.length <= 0) {
    const cinemaListAction = actions.cinemaList;
    const getCinemaList = getData.bind(null, cinemaListAction, api.getCinemaList);
    yield call(getCinemaList, 'cinemaList');
  }
}

/**
 * 电影排期
 */
function* loadShowInfo(mid: number, cid: number) {
  const data = yield select(selectors.getShowInfo);
  const showInfoAction = actions.showInfo;
  const getShowInfo = getData.bind(null, showInfoAction, api.getShowInfo);
  yield call(getShowInfo, 'showInfo', { mid, cid });
}

/**
 * 场次座位
 */
function* loadSeatsInfo(sid: number, sdate: string) {
  const data = yield select(selectors.getSeatsInfo);
  const seatsInfoAction = actions.seatsInfo;
  const getSeatsInfo = getData.bind(null, seatsInfoAction, api.getSeatsInfo);
  yield call(getSeatsInfo, 'seatsInfo', { sid, sdate });
}

/******************************* WATCHERS *************************************/

function* watchLoadMovieList() {
  while(true) {
    yield take(actions.LOAD_MOVIE_LIST);
    yield fork(loadMovieList);
  }
}


function* watchLoadMovieDetail() {
  while(true) {
    const { id } = yield take(actions.LOAD_MOVIE_DETAIL);
    yield fork(loadMovieDetail, id);
  }
}

function* watchLoadAreaList() {
  while(true) {
    yield take(actions.LOAD_AREA_LIST);
    yield fork(loadAreaList);
  }
}

function* watchLoadCinemaList() {
  while(true) {
    yield take(actions.LOAD_CINEMA_LIST);
    yield fork(loadCinemaList);
  }
}


function* watchLoadShowInfo() {
  while(true) {
    const { mid, cid } = yield take(actions.LOAD_SHOW_INFO);
    yield fork(loadShowInfo, mid, cid);
  }
}

function* watchLoadSeatsInfo() {
  while(true) {
    const { sid, sdate } = yield take(actions.LOAD_SEATS_INFO);
    yield fork(loadSeatsInfo, sid, sdate);
  }
}

export default function* root() {
  yield [
    fork(watchLoadMovieList),
    fork(watchLoadMovieDetail),
    fork(watchLoadAreaList),
    fork(watchLoadCinemaList),
    fork(watchLoadShowInfo),
    fork(watchLoadSeatsInfo)
  ]
}

