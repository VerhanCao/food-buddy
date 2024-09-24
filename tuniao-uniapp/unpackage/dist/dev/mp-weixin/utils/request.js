"use strict";
const common_vendor = require("../common/vendor.js");
const request = common_vendor.axios.create({
  //请求路径统一加上"#{baseURL}"前缀
  baseURL: "http://localhost:8080",
  timeout: 3e4,
  adapter: common_vendor.mpAdapter
});
request.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json;charset = utf-8";
  return config;
}, (error) => {
  return Promise.reject(error);
});
request.interceptors.response.use(
  (reponse) => {
    let res = reponse.data;
    if (typeof res === "String") {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);
exports.request = request;
