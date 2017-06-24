import config from '../config';
import reqwest from 'reqwest';
import { Toast } from 'antd-mobile';

export default (options: reqwest.ReqwestOptions) => {

  // let token = localStorage.JWT_TOKEN;
  // if (!token) {
  //   browserHistory.push('/login');
  // }

  // options.headers = {
  //   'Authorization': 'Bearer ' + token
  // }

  // 成功回调
  const success: Function = options.success;
  if (options.success) {
    delete options.success;
  }

  // 失败回调
  const error: Function = options.error;
  if (options.error) {
    delete options.error;
  }

  options.url = options.url.indexOf('http') >= 0 ? options.url : config.domain + options.url;

  Toast.loading('加载中 ..', 0);

  // promise化
  return new Promise((resolve, reject) => {
    reqwest(options)
      .then(resp => {
        Toast.hide();
        console.log(resp);
        if (resp.code != 0) {
          Toast.fail('加载失败', 1);
          if (error) return reject(error(resp));
          return null;
        }
        if (success) return resolve(success(resp));
        return resolve(resp);
      })
      .fail(err => {
        Toast.hide();
        Toast.offline('网络连接失败', 2);
        console.error(`网络错误：${err.status} ${err.statusText}`);
        if (error) return reject(error(err));
        return reject(err);
      })
  }).then(
    response => ({ response }),
    error => ({ error })
  )
}