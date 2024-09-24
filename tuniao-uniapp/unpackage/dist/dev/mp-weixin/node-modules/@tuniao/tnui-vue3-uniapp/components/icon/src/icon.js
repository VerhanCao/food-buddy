"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "icon",
  props: common_vendor.iconProps,
  emits: common_vendor.iconEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const { isImg, iconClass, iconStyle } = common_vendor.useIcon(props);
    const handleClick = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isImg)
      }, common_vendor.unref(isImg) ? {
        b: _ctx.name,
        c: _ctx.imgMode
      } : {
        d: common_vendor.n(`tn-icon-${_ctx.name}`)
      }, {
        e: common_vendor.n(common_vendor.unref(iconClass)),
        f: common_vendor.s(common_vendor.unref(iconStyle)),
        g: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e5861ba"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue"]]);
wx.createComponent(Component);
