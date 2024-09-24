"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: common_vendor.selectTagsProps,
  emits: common_vendor.selectTagsEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const { selectTagsValue, tagClickHandle } = common_vendor.useSelectTags(props, emits);
    const { ns, tagClass, tagStyle } = common_vendor.useSelectTagsCustom(props, selectTagsValue);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.items, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index,
            c: common_vendor.n(common_vendor.unref(tagClass)(index, item)),
            d: common_vendor.s(common_vendor.unref(tagStyle)(index, item)),
            e: common_vendor.o(($event) => common_vendor.unref(tagClickHandle)(index, item), index)
          };
        }),
        b: common_vendor.n(common_vendor.unref(ns).e("tag-item")),
        c: common_vendor.n(common_vendor.unref(ns).b())
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b195a5e"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/tnuiv3p-tn-select-tags/index.vue"]]);
wx.createComponent(Component);
