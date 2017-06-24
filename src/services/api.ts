import request from '../utils/request';

export const getMovieList = (params) => {
  return request({
    url: `api/movie`
  });
};

export const getMovieDetail = (params) => {
  return request({
    url: `api/movie/${params.id}`
  })
}

export const getAreaList = (params) => {
  return request({
    url: `api/area`
  })
}

export const getCinemaList = (params) => {
  return request({
    url: `api/cinema/${params.area.id}`
  })
}

export const getShowInfo = (params) => {
  return request({
    url: `api/show?cinemaId=${params.cid}&movieId=${params.mid}`
  })
}

export const getSeatsInfo = (params) => {
  return request({
    url: `api/seat?showId=${params.sid}&showDate=${params.sdate}`
  })
}