"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  (TnTag + TnCircleProgress + TnIcon + TnTabsItem + TnTabs + TnButton + TnEmpty + TnModal)();
}
const TnCircleProgress = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/circle-progress/src/circle-progress.js";
const TnTag = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tag/src/tag.js";
const TnIcon = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/icon/src/icon.js";
const TnEmpty = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const TnTabs = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.js";
const TnTabsItem = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.js";
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnModal = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/modal/src/modal.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "diet",
  setup(__props) {
    let total = common_vendor.ref(1800);
    let eat = common_vendor.ref(600);
    let canEat = common_vendor.ref(66);
    let style = common_vendor.ref("早餐");
    const currentTabIndex = common_vendor.ref(0);
    let userId = common_vendor.ref(1);
    let diets = common_vendor.ref([]);
    let datas = common_vendor.ref([]);
    let content = common_vendor.ref("");
    const modalRef = common_vendor.ref();
    const state = common_vendor.reactive({
      eat: {
        carbohydrates: 0,
        protein: 0,
        fat: 0
      }
    });
    const tabsData = [
      {
        text: "早餐"
      },
      {
        text: "中餐"
      },
      {
        text: "晚餐"
      },
      {
        text: "副食"
      },
      {
        text: "运动"
      }
    ];
    const addDiet = () => {
      common_vendor.index.navigateTo({
        url: "../addDiet/addDiet?style=" + style.value
      });
    };
    const queryDiets = async () => {
      let res = await utils_request.request.get("/queryDietMessage/" + userId.value);
      if (res.code === 1) {
        datas.value = res.data;
        diets.value = datas.value.filter((item) => {
          return item.style === "早餐";
        });
        getData();
      }
    };
    const recommend = () => {
      utils_request.request.get("/recommend", { params: { id: userId.value } }).then((res) => {
        var _a;
        content.value = res.data ? res.data : "您当前的饮食习惯良好，请继续保持";
        (_a = modalRef.value) == null ? void 0 : _a.showModal({
          title: "本日菜品推荐",
          content: content.value
        });
      });
    };
    const dietAdvice = () => {
      let str = diets.value.map((item) => {
        return item.name + item.many + "克";
      }).toString();
      common_vendor.index.navigateTo({
        url: `../analysis/analysis?style=${style.value}&id=${userId.value}&str=${str}`
      });
    };
    const switchStyle = (style1) => {
      style.value = style1;
      diets.value = datas.value.filter((item) => {
        return item.style === style1;
      });
    };
    const getData = () => {
      for (let index = 0; index < datas.value.length; index++) {
        state.eat.protein += parseFloat(datas.value[index].protein.replace("克", "") / 100 * datas.value[index].many);
        state.eat.TS += parseFloat(datas.value[index].carbohydrates.replace("克", "") / 100 * datas.value[index].many);
        state.eat.fat += parseFloat(datas.value[index].fat.replace("克", "") / 100 * datas.value[index].many);
      }
    };
    common_vendor.onMounted(() => {
      queryDiets();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(state.eat.carbohydrates),
        b: common_vendor.p({
          type: "primary"
        }),
        c: common_vendor.t(common_vendor.unref(total) - common_vendor.unref(eat)),
        d: common_vendor.p({
          percent: common_vendor.unref(canEat),
          ["active-color"]: "#00bf70"
        }),
        e: common_vendor.t(state.eat.protein),
        f: common_vendor.t(state.eat.fat),
        g: common_vendor.p({
          name: "fire-fill"
        }),
        h: common_vendor.f(tabsData, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => switchStyle(item.text), index),
            c: "97323f43-4-" + i0 + ",97323f43-3",
            d: common_vendor.p({
              title: item.text
            })
          };
        }),
        i: common_vendor.o(($event) => currentTabIndex.value = $event),
        j: common_vendor.p({
          height: "53rpx",
          ["bg-color"]: "tn-grey-light_bg",
          ["font-size"]: "23",
          ["bar-width"]: "60",
          ["bar-color"]: "tn-gray_bg",
          modelValue: currentTabIndex.value
        }),
        k: common_vendor.p({
          name: "add-circle"
        }),
        l: common_vendor.o(addDiet),
        m: common_vendor.p({
          type: "success",
          text: true
        }),
        n: common_vendor.unref(datas).length === 0
      }, common_vendor.unref(datas).length === 0 ? {
        o: common_vendor.p({
          mode: "data"
        })
      } : {
        p: common_vendor.t(common_vendor.unref(style)),
        q: common_vendor.f(common_vendor.unref(diets), (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.many),
            d: common_vendor.t(item.energy),
            e: index
          };
        }),
        r: common_vendor.o(($event) => dietAdvice()),
        s: common_vendor.p({
          plain: true,
          type: "success"
        }),
        t: common_vendor.o(($event) => recommend()),
        v: common_vendor.p({
          plain: true,
          ["custom-style"]: {
            marginLeft: "200rpx"
          }
        })
      }, {
        w: common_vendor.sr(modalRef, "97323f43-10", {
          "k": "modalRef"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-97323f43"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/diet/diet.vue"]]);
wx.createPage(MiniProgramPage);
