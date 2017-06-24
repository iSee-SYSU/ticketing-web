import { connect } from 'react-redux';
import { push, goBack} from 'react-router-redux';
import * as React from 'react';
import { NavBar, List, InputItem } from 'antd-mobile';
import { loadMovieList, loadAreaList, changeArea } from '../actions';
import InputWrapper from '../components/login';
import { createForm } from 'rc-form';

export interface LoginPageProps {
  goBack: Function;
}

class LoginPage extends React.Component<LoginPageProps, any> {

  render() {
    return (
      <div>
        <NavBar iconName={'left'} onLeftClick={() => this.props.goBack()}>下单</NavBar>
        <InputWrapper />
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

export default connect(mapStateToProps, { push, goBack })(LoginPage);