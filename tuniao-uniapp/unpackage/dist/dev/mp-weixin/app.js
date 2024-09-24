"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/chat/chat.js";
  "./pages/diet/diet.js";
  "./pages/personal/personal.js";
  "./pages/purchase/purchase.js";
  "./pages/login/login.js";
  "./pages/upload/upload.js";
  "./pages/analysis/analysis.js";
  "./pages/logon/logon.js";
  "./pages/addDiet/addDiet.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp/diet_management/uniapp1/Diet/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
