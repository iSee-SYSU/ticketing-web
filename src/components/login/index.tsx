import { List, InputItem, WhiteSpace, Button, Card } from 'antd-mobile';
import { createForm } from 'rc-form';
import { push } from 'react-router-redux';
import * as React from 'react';
import { api } from '../../services';

class InputGroup extends React.Component<any, any> {

  state = {
    isSending: false,
    time: 60,
    loading: false,
    order: null
  }

  componentDidMount() {
    const orders = JSON.parse(localStorage.orders || '[]');
    if (orders.length > 0) {
      this.setState({ order: orders[orders.length-1] });
    }
  }

  setTime() {
    const { isSending, time } = this.state;
    setTimeout(() => {
      this.setState({time: time-1});
      if (time > 1) {
        this.setTime();
      }
    }, 1000);
  }


  handleSubmit = () => {
    const { getFieldProps } = this.props.form;
    const number = getFieldProps('number').value;
    if (!number || number.length !== 4) {
      return;
    }
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      window.location.href = '/result';
    }, 2000);
  }


  render() {
    const { getFieldProps } = this.props.form;
    const { isSending, time, loading, order } = this.state;
    console.log(order);
    const info = order ? (
      <Card full>
        <Card.Header
          title={order.movieDetail.detail.nm}
          thumb={order.movieDetail.detail.img}
          extra={<span>{order.showDate}</span>}
        />
        <Card.Body>
          <div>{order.seats.join('、') + ' 座位'}</div>
        </Card.Body>
        <Card.Footer content="" extra={<div>{order.movieDetail.detail.ver}</div>} />
      </Card>
    ) : null;
    return (
      <div>
        {info}
        <List renderHeader={() => '联系信息'}>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            placeholder=""
          >手机号码</InputItem>
          <InputItem
            {...getFieldProps('number')}
            type="number"
            placeholder="请输入验证码"
          >验证码</InputItem>
          <List.Item>
              <div
                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                onClick={() => {
                  const phone = getFieldProps('phone').value.replace(/\s/g, '');
                  console.log(phone);
                  if (phone && phone.length !== 11) return;
                  if (isSending) return;
                  api.getVerification({ phone });
                  this.setState({isSending: true});
                  this.setTime();
                }}
              >
            { isSending ? `${time}s 后重新发送` : '点击获取验证码' }
          </div>
          </List.Item>
        </List>
        <WhiteSpace />
        <Button style={{margin: '0.16rem'}} type="primary" loading={loading} onClick={this.handleSubmit}>提交订单</Button>
      </div>
    )
  }
}

const InputWrapper = createForm()(InputGroup);

export default InputWrapper;