const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

interface RequestTypes {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

/**
 * 创建异步请求所用 typs 集合
 */
function createRequestTypes(base: string): RequestTypes {
  return {
    REQUEST: `${base}_${REQUEST}`,
    SUCCESS: `${base}_${SUCCESS}`,
    FAILURE: `${base}_${FAILURE}`
  };
}
 
/**
 * 构造 action
 */
function action(type: string, payload: any = {}) {
  return { type, ...payload };
}



// 首页电影列表
export const LOAD_MOVIE_LIST: string = 'LOAD_MOVIE_LIST';

export const loadMovieList = () => action(LOAD_MOVIE_LIST);

const MOVIE_LIST: RequestTypes = createRequestTypes('MOVIE_LIST');

export const movieList = {
  request: (params) => action(MOVIE_LIST.REQUEST, { params }),
  success: (params, response, field) => action(MOVIE_LIST.SUCCESS, { params, response, field }),
  failure: (params, error) => action(MOVIE_LIST.FAILURE, { params, error }),
}

// 电影详情页
export const LOAD_MOVIE_DETAIL: string = 'LOAD_MOVIE_DETAIL';

export const loadMovieDetail = (id: number) => action(LOAD_MOVIE_DETAIL, { id });

const MOVIE_DETAIL: RequestTypes = createRequestTypes('MOVIE_DETAIL');

export const movieDetail = {
  request: (params) => action(MOVIE_DETAIL.REQUEST, { params }),
  success: (params, response, field) => action(MOVIE_DETAIL.SUCCESS, { params, response, field }),
  failure: (params, error) => action(MOVIE_DETAIL.FAILURE, { params, error }),
}

// 获取全部区域列表
export const LOAD_AREA_LIST: string = 'LOAD_AREA_LIST';

export const loadAreaList = () => action(LOAD_AREA_LIST);

const AREA_LIST: RequestTypes = createRequestTypes('AREA_LIST');

export const areaList = {
  request: (params) => action(AREA_LIST.REQUEST, { params }),
  success: (params, response, field) => action(AREA_LIST.SUCCESS, { params, response, field }),
  failure: (params, error) => action(AREA_LIST.FAILURE, { params, error }),
}

// 改变区域
export const CHANGE_AREA: string = 'CHANGE_AREA';
export const changeArea = (area) => action(CHANGE_AREA, area);

// 获取全部影院信息
export const LOAD_CINEMA_LIST: string = 'LOAD_CINEMA_LIST';

export const loadCinemaList = () => action(LOAD_CINEMA_LIST);

const CINEMA_LIST: RequestTypes = createRequestTypes('CINEMA_LIST');

export const cinemaList = {
  request: (params) => action(CINEMA_LIST.REQUEST, {params}),
  success: (params, response, field) => action(CINEMA_LIST.SUCCESS, { params, response, field }),
  failure: (params, error) => action(CINEMA_LIST.FAILURE, { params, error }),
}

// 获取电影排期
export const LOAD_SHOW_INFO: string = 'LOAD_SHOW_INFO';

export const loadShowInfo = (mid: number, cid: number) => action(LOAD_SHOW_INFO, {mid, cid});

const SHOW_INFO: RequestTypes = createRequestTypes('SHOW_INFO');

export const showInfo = {
  request: (params) => action(SHOW_INFO.REQUEST, {params}),
  success: (params, response, field) => action(SHOW_INFO.SUCCESS, { params, response, field }),
  failure: (params, error) => action(SHOW_INFO.FAILURE, { params, error }),
}

// 获取场次座位信息
export const LOAD_SEATS_INFO: string = 'LOAD_SEATS_INFO';

export const loadSeatsInfo = (sid: number, sdate: string) => action(LOAD_SEATS_INFO, {sid, sdate});

const SEATS_INFO: RequestTypes = createRequestTypes('SEATS_INFO');

export const seatsInfo = {
  request: (params) => action(SEATS_INFO.REQUEST, {params}),
  success: (params, response, field) => action(SEATS_INFO.SUCCESS, { params, response, field }),
  failure: (params, error) => action(SEATS_INFO.FAILURE, { params, error }),
}
