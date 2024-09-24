"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_tn_icon = common_vendor.resolveComponent("tn-icon");
  _component_tn_icon();
}
if (!Math) {
  (TnInput + TnButton + TnFooter)();
}
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnInput = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/input/src/input.js";
const TnFooter = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/footer/src/footer.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const state = common_vendor.reactive({
      params: {
        number: "",
        password: ""
      }
    });
    const login = () => {
      common_vendor.index.switchTab({
        url: "/pages/chat/chat"
      });
    };
    const logon = () => {
      common_vendor.index.navigateTo({
        url: "/pages/logon/logon"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => state.params.number = $event),
        b: common_vendor.p({
          height: "69",
          placeholder: "用户名",
          underline: true,
          modelValue: state.params.number
        }),
        c: common_vendor.o(($event) => state.params.password = $event),
        d: common_vendor.p({
          height: "69",
          ["show-password"]: false,
          placeholder: "账户密码",
          type: "password",
          underline: true,
          modelValue: state.params.password
        }),
        e: common_vendor.o(login),
        f: common_vendor.p({
          width: "100",
          text: true,
          ["font-size"]: "21px"
        }),
        g: common_vendor.p({
          name: "right-arrow"
        }),
        h: common_vendor.o(($event) => logon()),
        i: common_vendor.p({
          content: "copyright © 2024 饮食陪伴官",
          ["offset-bottom"]: 20
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
