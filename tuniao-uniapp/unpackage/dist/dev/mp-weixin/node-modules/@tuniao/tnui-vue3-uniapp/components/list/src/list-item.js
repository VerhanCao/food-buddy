"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../../icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list-item",
  props: common_vendor.listProps,
  emits: common_vendor.listEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const { ns, listClass, listStyle, rightIconClass, rightIconStyle } = common_vendor.useListCustomStyle(props);
    const listClickEvent = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(ns).e("content")),
        b: _ctx.rightIcon
      }, _ctx.rightIcon ? {
        c: common_vendor.p({
          name: _ctx.rightIcon
        }),
        d: common_vendor.n(common_vendor.unref(rightIconClass)),
        e: common_vendor.s(common_vendor.unref(rightIconStyle))
      } : {}, {
        f: _ctx.bottomBorder
      }, _ctx.bottomBorder ? {
        g: common_vendor.n(common_vendor.unref(ns).e("bottom-border")),
        h: common_vendor.n(common_vendor.unref(ns).is("indent", _ctx.bottomBorderIndent))
      } : {}, {
        i: common_vendor.n(common_vendor.unref(listClass)),
        j: common_vendor.s(common_vendor.unref(listStyle)),
        k: _ctx.hoverClass,
        l: common_vendor.o(listClickEvent)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-89a6c122"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue"]]);
wx.createComponent(Component);
