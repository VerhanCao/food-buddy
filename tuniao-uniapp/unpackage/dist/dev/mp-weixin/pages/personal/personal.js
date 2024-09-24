"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (TnButton + TnListItem + TnFooter + TnUpdateUserInfoPopup)();
}
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnListItem = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/list/src/list-item.js";
const TnUpdateUserInfoPopup = () => "../../node-modules/tnuiv3p-tn-update-user-info-popup/index.js";
const TnFooter = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/footer/src/footer.js";
const __default__ = {
  data() {
    return {};
  },
  methods: {}
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "personal",
  setup(__props) {
    let name = common_vendor.ref("饿.");
    const showPopup = common_vendor.ref(false);
    const avatar = common_vendor.ref("../../static/avatar/rice.jpg");
    const avatarChooseHandle = (url) => {
      common_vendor.index.uploadFile({
        url: "http://localhost:8080/upload/avatar",
        fileType: "image",
        filePath: url,
        name: "file",
        success: (res) => {
          const data = JSON.parse(res.data);
          avatar.value = data.data.url;
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(name)),
        b: common_vendor.o(($event) => showPopup = true),
        c: common_vendor.p({
          text: true
        }),
        d: common_vendor.p({
          width: "100%",
          height: "100rpx",
          radius: true,
          ["bottom-border"]: true,
          ["bottom-border-indent"]: true,
          ["right-icon"]: "right"
        }),
        e: common_vendor.p({
          width: "100%",
          height: "100rpx",
          radius: true,
          ["bottom-border"]: true,
          ["bottom-border-indent"]: true,
          ["right-icon"]: "right"
        }),
        f: common_vendor.p({
          width: "100%",
          height: "100rpx",
          radius: true,
          ["bottom-border"]: true,
          ["bottom-border-indent"]: true,
          ["right-icon"]: "right"
        }),
        g: common_vendor.p({
          width: "100%",
          height: "100rpx",
          radius: true,
          ["bottom-border"]: true,
          ["bottom-border-indent"]: true,
          ["right-icon"]: "right"
        }),
        h: common_vendor.p({
          content: "Copyright © 饮食陪伴官"
        }),
        i: common_vendor.o(avatarChooseHandle),
        j: common_vendor.o(($event) => showPopup = $event),
        k: common_vendor.o(($event) => common_vendor.isRef(name) ? name.value = $event : name = $event),
        l: common_vendor.o(($event) => avatar = $event),
        m: common_vendor.p({
          show: showPopup,
          nickname: common_vendor.unref(name),
          avatar
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ae23533"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/personal/personal.vue"]]);
wx.createPage(MiniProgramPage);
