import promise from "es6-promise";
import fetch from "isomorphic-fetch";
// import StaticToast from 'src/components/common/toast'

promise.polyfill();

export const fetchJson = options => {
  options.url = "http://localhost:4000" + options.url;
  const { url, type, data, ...others } = options;
  let opts = {
    ...others,
    method: type || "get",
    // credentials: 'include',// 日志上报的，需求注释这一行
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (["POST", "PUT"].indexOf(opts.method.toUpperCase()) >= 0) {
    opts.body = JSON.stringify(data);
  }

  fetch(url, opts)
    .then(resData => toJson(resData, opts))
    .then(resData => resHandler(resData, opts));
  // .catch(error => errorHandler(error, opts))
};

export const fetchFormData = options => {
  const { url, type, data, ...others } = options;

  let opts = {
    ...others,
    method: type || "get",
    credentials: "include"
  };

  if (["POST", "PUT"].indexOf(opts.method.toUpperCase()) >= 0) {
    opts.body = data;
  }

  fetch(url, opts)
    .then(resData => toJson(resData, opts))
    .then(resData => resHandler(resData, opts));
  // .catch(error => errorHandler(error, opts))
};

function toJson(resp, options) {
  if (resp.status >= 400) {
    return errorHandler(null, options, resp.status);
  }
  return resp.json();
}

// 请求成功处理
function resHandler(resData, options) {
  if (resData.status == 1) {
    options.success && options.success(resData);
  } else {
    return errorHandler(resData.message, options, resData.status);
  }
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error);
}
