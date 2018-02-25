/* eslint-disable */
import axios from 'axios'
import {getStore, setStore} from '../config/mUtils'
import {md5} from '../common/js/md5.js'
import {Toast} from 'mint-ui'

// let Module_ = 1;      //  本地环境
// let Module_ = 2;   //  测试环境
let Module_ = 3;   //  生产环境
// let Module_ = 4;   //
  
let baseAPI = "", payAPI = "", baseURL = "";
switch (Module_) {
  case 1:
    baseAPI = "/api";
    payAPI = "/api";
    baseURL = "/";
    break;
  case 2:
    baseAPI = "http://192.168.16.253:6070";
    payAPI = "http://192.168.16.253:6070";
    baseURL = "http://192.168.16.253:6070/h5/";
    break;
  case 3:
    baseAPI = "http://118.178.247.200:6070";
    payAPI = "http://118.178.247.200:6070";
    baseURL = "http://118.178.247.200:6070/h5/";
    break;
  case 4:
    baseAPI = "";
    payAPI = "";
    baseURL = "";
    break;
}

let appkey = 'FEA198F41528E70213E44F7782BDE856';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
//		const token = getStore('token')
//		var signMsg = getStore('signMsg')
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json'
//			"token": token,
//			"signMsg": signMsg
    }
//  console.log(config)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 获取验签
export const singMsgT = params => {
  const token = getStore('token')
  var newArr = []
  for (var item in params) {
    var str = item + '=' + params[item]
    newArr.push(str)
  }
  newArr = newArr.sort().join('|')
  var signMsg = md5(appkey + token + newArr)
  setStore('signMsg', signMsg)
}
// 登录
export const All = (params) => {
  var token = getStore('token');
  var mobile = getStore('mobile');
  var userId = getStore('userId');
  var publicParams = {version: '1.0.0', softType: 'h5_qyq3_v1.0', mobile: mobile, userId: userId, tokenId: token};
  var obj = Object.assign(publicParams, params);
  return axios.post(baseAPI, obj).then(res => {
    if (res.data.retCode === "7777") {
      localStorage.clear();
      window.location.href = `${baseURL}#/login`;
      return;
    }
    return res.data;
  }).catch(function (error) {
    Toast({message: "系统异常，请刷新重试", position: 'bottom', duration: 1500});
  });
};

export const payPost = (params) => {
  let publicParams = {
    version: '1.0.0',
    softType: 'h5_qyq3_v1.0',
    mobile: getStore('mobile'),
    userId: getStore('userId'),
    tokenId: getStore('token')
  };
  let obj = Object.assign(publicParams, params);
  return axios.post(payAPI, obj).then(res => res.data).catch(function (error) {
    Toast({message: "系统异常，请稍后重试", position: 'bottom', duration: 1500});
  })
  // let publicParams = {
  //   version: '3.0.0',
  //   softType: 'h5_qyq_v3.0',
  //   mobile: "17682489388",
  //   userId: "1111",
  //   tokenId: ""
  // };
  // let obj = Object.assign(publicParams, params);
  // return axios.post('bdApi', obj).then(res => res.data).catch(function (error) {
  //   Toast({message: "系统异常，请稍后重试", position: 'bottom', duration: 1500});
  // })
};

export const callbackURL = (path) => {
  return baseURL + "#/" + path;
}

export const moxieCallBack = (path) => {
  return baseURL + path;
}
