"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  (SelectTags + TnInput)();
}
const SelectTags = () => "../../node-modules/tnuiv3p-tn-select-tags/index.js";
const TnInput = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/input/src/input.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "logon",
  setup(__props) {
    let input = common_vendor.ref("");
    const step = common_vendor.ref(1);
    const target = common_vendor.ref([]);
    const like = common_vendor.ref([]);
    const state = common_vendor.reactive({
      params: {
        number: "",
        password: "",
        target: ""
      }
    });
    const targets = [
      {
        label: "减脂",
        value: "目标(减脂)"
      },
      {
        label: "健身",
        value: "目标(健身)"
      },
      {
        label: "疾病预防",
        value: "目标(疾病预防)"
      },
      {
        label: "降血压",
        value: "目标(降血压)"
      },
      {
        label: "养生",
        value: "目标(养生)"
      },
      {
        label: "减肥",
        value: "目标(减肥)"
      }
    ];
    const likes = [
      {
        label: "酸",
        value: "口味(酸)",
        activeBgColor: "tn-teal-light",
        activeColor: "tn-teal"
      },
      {
        label: "甜",
        value: "口味(甜)",
        activeBgColor: "tn-gray",
        activeColor: "tn-gray-light"
      },
      {
        label: "苦",
        value: "口味(苦)",
        activeBgColor: "tn-brown-light",
        activeColor: "tn-brown"
      },
      {
        label: "辣",
        value: "口味(辣)",
        activeBgColor: "tn-orangered-light",
        activeColor: "tn-orangered"
      },
      {
        label: "咸",
        value: "口味(咸)",
        activeBgColor: "tn-grey-light",
        activeColor: "tn-grey"
      },
      {
        label: "清淡",
        value: "口味(清淡)",
        activeBgColor: "tn-gray-light",
        activeColor: "tn-gray"
      }
    ];
    const addStep = () => {
      step.value++;
    };
    const logon = () => {
      state.params.target = target.value.join(",") + ";" + like.value.join(",") + ";" + input.value;
      console.log("target: " + state.params.target);
      utils_request.request.post("/resist", state.params).then((res) => {
        if (res.code === 1) {
          common_vendor.index.showToast({
            title: "注册成功"
          });
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(step.value),
        b: step.value === 1
      }, step.value === 1 ? {
        c: state.params.number,
        d: common_vendor.o(($event) => state.params.number = $event.detail.value),
        e: state.params.password,
        f: common_vendor.o(($event) => state.params.password = $event.detail.value),
        g: common_vendor.o(($event) => addStep())
      } : step.value === 2 ? {
        i: common_vendor.o(($event) => target.value = $event),
        j: common_vendor.p({
          items: targets,
          modelValue: target.value
        }),
        k: common_vendor.o(($event) => like.value = $event),
        l: common_vendor.p({
          items: likes,
          multiple: false,
          modelValue: like.value
        }),
        m: common_vendor.o(($event) => common_vendor.isRef(input) ? input.value = $event : input = $event),
        n: common_vendor.p({
          type: "textarea",
          height: "150",
          modelValue: common_vendor.unref(input)
        }),
        o: common_vendor.o(logon)
      } : {}, {
        h: step.value === 2
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fcd6bf6a"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/logon/logon.vue"]]);
wx.createPage(MiniProgramPage);
