import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import * as React from 'react';
import { Icon, List, Result } from 'antd-mobile';
import { loadMovieList, loadAreaList, changeArea } from '../actions';
import InputWrapper from '../components/login';
import { createForm } from 'rc-form';

export interface ResultPageProps {
  goBack: Function;
}

class ResultPage extends React.Component<ResultPageProps, any> {

  componentDidMount() {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }

  render() {
    return (
      <div>
        <Result
          img={<Icon type='check' size='lg' style={{color: '#17d8a9'}}/>}
          title="等待出票"
          message="已提交订单，正在等待出票"
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    data: {  }
  } = state

  return {
  }
}

export default connect(mapStateToProps, { push, goBack })(ResultPage);