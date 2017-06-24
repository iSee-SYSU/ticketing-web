import * as React from 'react';
import { Button } from 'antd-mobile';
import request from '../../utils/request';
import './styles/index.css';
import './styles/index.sass';

export interface MovieListProps {
  movies: Array<any>;
  push: Function;
}


export const MovieList = (props: MovieListProps) => {

  
  const { movies, push } = props;

  const toCinema = (event, id) => {
    event.stopPropagation();
    push(`/movie/${id}/cinema`);
  }

  const cards = movies.map((item, index) => (
    <div className='movie' key={index} onClick={() => push(`/detail/${item.id}`)}>
      <div className='movie-cover' style={{ backgroundImage: `url(${item.img})` }}></div>
      <p className='movie-score'>{item.sc == 0 ? '未上映' : item.sc}</p>
      <div className='movie-info'>
        <p className='movie-name'>{item.nm}</p>
        <p className='movie-cat'>{item.cat}</p>
        <p className='movie-content'>{item.scm}</p>
      </div>
      <p className='movie-showInfo'>{item.showInfo}</p>
      <Button style={{ 'backgroundColor': '#45c45b' }}type="primary" inline size="small" className='buy-btn' onClick={(e) => toCinema(e, item.id)}>购票</Button>
    </div>
  ));

  return (
    <div id="movie-list">
      {cards}
    </div>
  );
  
}
