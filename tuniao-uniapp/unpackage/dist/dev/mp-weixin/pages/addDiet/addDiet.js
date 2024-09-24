"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_uni_icons2 + _easycom_uni_badge2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_badge + TnEmpty + TnPopup + TnModal + TnNumberBox + TnButton + TnFormItem + TnForm)();
}
const TnPopup = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/popup/src/popup.js";
const TnEmpty = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnModal = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/modal/src/modal.js";
const TnNumberBox = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.js";
const TnForm = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/form/src/form.js";
const TnFormItem = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/form/src/form-item.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addDiet",
  setup(__props) {
    let date = common_vendor.ref("");
    let weight1 = common_vendor.ref(0);
    let index = 0;
    let style = common_vendor.ref("");
    let cateList = common_vendor.ref(["谷类", "肉蛋奶", "蔬果", "火锅", "甜品", "饮品"]);
    let activeIndex = common_vendor.ref(0);
    let goodList = common_vendor.ref([]);
    let sort = common_vendor.ref("谷类");
    let dietList = common_vendor.ref([]);
    const showPopup = common_vendor.ref(false);
    let showPopup1 = common_vendor.ref(false);
    let activeIndex1 = common_vendor.ref(0);
    let cateList1 = common_vendor.ref(["早餐", "中餐", "晚餐", "副食", "运动"]);
    const modalRef = common_vendor.ref();
    const addDiet = (diet) => {
      if (dietList.value.indexOf(diet) === -1) {
        dietList.value.push(diet);
      }
    };
    const addWeight = (i, weight) => {
      console.log("diets: " + dietList.value);
      console.log("i: " + i);
      console.log("weight: " + weight);
      weight1.value = weight;
      index = i;
      showPopup1.value = true;
    };
    const saveWeight = () => {
      dietList.value[index].many = weight1.value;
      showPopup1.value = false;
    };
    const openModel = () => {
      var _a;
      (_a = modalRef.value) == null ? void 0 : _a.showModal({
        title: "提示",
        content: "当前记录中仍有饮食未填写份量，可能会导致分析不准确，是否继续？",
        showCancel: true,
        confirmText: "去填写",
        cancelText: "继续",
        confirm: () => {
          showPopup.value = true;
        },
        cancel() {
        }
      });
    };
    const add = () => {
      let diets = dietList.value.filter((diet) => {
        return diet.many === 0;
      });
      console.log("diets: " + diets);
      if (diets.length > 0) {
        openModel();
      } else {
        for (let index2 = 0; index2 < dietList.value.length; index2++) {
          dietList.value[index2].style = style.value;
          dietList.value[index2].userId = 1;
        }
        utils_request.request.post("/record", dietList.value).then((res) => {
          if (res.code === 1) {
            dietList.value = [];
          }
        });
      }
    };
    const queryDiets = () => {
      utils_request.request.get("/queryDiets", { params: { sort: sort.value } }).then((res) => {
        if (res.code === 1) {
          goodList.value = res.data;
        }
      });
    };
    const changeActive = (i, diet) => {
      activeIndex.value = i;
      sort.value = diet;
      queryDiets();
    };
    const changeActive1 = (i, cate) => {
      activeIndex1.value = i;
      if (cate != "早餐") {
        dietList.value = [];
      }
    };
    const goToSearch = () => {
      common_vendor.index.navigateTo({
        url: "../search/search"
      });
    };
    const getDate = () => {
      let currentDate = /* @__PURE__ */ new Date();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let formattedDate = month + "月" + day + "日";
      console.log(formattedDate);
      return formattedDate;
    };
    common_vendor.onLoad((option) => {
      common_vendor.index.setNavigationBarTitle({
        title: `${getDate() + option.style}`
      });
      style.value = option.style;
      queryDiets();
    });
    common_vendor.onMounted(() => {
      date.value = getDate();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "search",
          size: "26",
          color: "#9F9F9F"
        }),
        b: common_vendor.o(goToSearch),
        c: common_vendor.f(common_vendor.unref(cateList), (item, index2, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(common_vendor.unref(activeIndex) == index2 ? "active" : ""),
            c: index2,
            d: common_vendor.o(($event) => changeActive(index2, item), index2)
          };
        }),
        d: common_vendor.f(common_vendor.unref(goodList), (goodItem, goodIndex, i0) => {
          return {
            a: goodItem.img,
            b: common_vendor.t(goodItem.name),
            c: goodIndex,
            d: common_vendor.o(($event) => addDiet(goodItem), goodIndex)
          };
        }),
        e: common_vendor.p({
          text: common_vendor.unref(dietList).length,
          absolute: "rightTop",
          size: "small"
        }),
        f: !showPopup.value
      }, !showPopup.value ? {
        g: common_vendor.p({
          type: "up",
          size: "30"
        }),
        h: common_vendor.o(($event) => showPopup.value = true)
      } : showPopup.value ? {
        j: common_vendor.p({
          type: "down",
          size: "30"
        }),
        k: common_vendor.o(($event) => showPopup.value = false)
      } : {}, {
        i: showPopup.value,
        l: common_vendor.o(add),
        m: common_vendor.f(common_vendor.unref(cateList1), (item, index2, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(common_vendor.unref(activeIndex1) == index2 ? "active" : ""),
            c: index2,
            d: common_vendor.o(($event) => changeActive1(index2, item), index2)
          };
        }),
        n: common_vendor.t(common_vendor.unref(dietList).length),
        o: common_vendor.f(common_vendor.unref(dietList), (dietItem, dietIndex, i0) => {
          return {
            a: dietItem.img,
            b: common_vendor.t(dietItem.name),
            c: common_vendor.o(($event) => addWeight(dietIndex, dietItem.many), dietIndex),
            d: "2b547a99-5-" + i0 + ",2b547a99-4",
            e: "2b547a99-6-" + i0 + ",2b547a99-4",
            f: dietIndex,
            g: common_vendor.o(($event) => addDiet(dietItem), dietIndex)
          };
        }),
        p: common_vendor.p({
          type: "compose",
          size: "27"
        }),
        q: common_vendor.p({
          type: "trash",
          size: "27"
        }),
        r: common_vendor.unref(dietList).length === 0
      }, common_vendor.unref(dietList).length === 0 ? {
        s: common_vendor.p({
          mode: "list"
        })
      } : {}, {
        t: common_vendor.o(($event) => showPopup.value = $event),
        v: common_vendor.p({
          ["open-direction"]: "bottom",
          width: "100%",
          height: "600rpx",
          modelValue: showPopup.value
        }),
        w: common_vendor.sr(modalRef, "2b547a99-8", {
          "k": "modalRef"
        }),
        x: common_vendor.o(($event) => common_vendor.isRef(weight1) ? weight1.value = $event : weight1 = $event),
        y: common_vendor.p({
          modelValue: common_vendor.unref(weight1)
        }),
        z: common_vendor.o(saveWeight),
        A: common_vendor.p({
          text: true
        }),
        B: common_vendor.p({
          label: "请填写份量(g)"
        }),
        C: common_vendor.p({
          size: "lg"
        }),
        D: common_vendor.o(($event) => common_vendor.isRef(showPopup1) ? showPopup1.value = $event : showPopup1 = $event),
        E: common_vendor.p({
          width: "80%",
          height: "250",
          modelValue: common_vendor.unref(showPopup1)
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2b547a99"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/addDiet/addDiet.vue"]]);
wx.createPage(MiniProgramPage);
