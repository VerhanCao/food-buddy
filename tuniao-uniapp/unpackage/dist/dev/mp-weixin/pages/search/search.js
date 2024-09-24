"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    let time = common_vendor.ref(null);
    let keyword = common_vendor.ref("");
    let searchList = common_vendor.ref([]);
    let historyList = common_vendor.ref([]);
    let foundList = common_vendor.ref(["米饭", "鸡蛋", "玉米", "苹果", "红薯", "香蕉"]);
    const input = (e) => {
      clearTimeout(time.value);
      time.value = setTimeout(() => {
        keyword.value = e;
      }, 500);
      console.log(e);
    };
    const clearHistory = () => {
      historyList.value = [];
      common_vendor.index.setStorageSync("kw", "[]");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(input),
        b: common_vendor.p({
          radius: 20,
          bgColor: "#F7F7F7",
          cancelButton: "none"
        }),
        c: common_vendor.unref(searchList).length != 0
      }, common_vendor.unref(searchList).length != 0 ? {
        d: common_vendor.f(common_vendor.unref(searchList), (searchItem, searchIndex, i0) => {
          return {
            a: "c10c040c-1-" + i0,
            b: common_vendor.t(searchItem.word),
            c: searchIndex
          };
        }),
        e: common_vendor.p({
          type: "search",
          size: "18",
          color: "#C0C0C0"
        })
      } : common_vendor.e({
        f: common_vendor.o(clearHistory),
        g: common_vendor.p({
          type: "trash",
          size: "20",
          color: "#C0C0C0"
        }),
        h: common_vendor.unref(historyList).length != 0
      }, common_vendor.unref(historyList).length != 0 ? {
        i: common_vendor.f(common_vendor.unref(historyList), (historyItem, historyIndex, i0) => {
          return {
            a: common_vendor.t(historyItem),
            b: historyIndex
          };
        })
      } : {}, {
        j: common_vendor.p({
          type: "",
          size: "20",
          color: "#C0C0C0"
        }),
        k: common_vendor.f(common_vendor.unref(foundList), (foundItem, foundIndex, i0) => {
          return {
            a: common_vendor.t(foundItem),
            b: foundIndex
          };
        })
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
