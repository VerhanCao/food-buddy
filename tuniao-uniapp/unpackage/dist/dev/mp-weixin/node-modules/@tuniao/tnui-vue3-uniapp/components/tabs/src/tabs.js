"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabs",
  props: common_vendor.tabsProps,
  emits: common_vendor.tabsEmits,
  setup(__props) {
    const props = __props;
    const {
      tabItems,
      componentId,
      barComponentId,
      barOffsetLeft,
      scrollLeft,
      showBar
    } = common_vendor.useTabs(props);
    const { ns, tabsClass, tabsStyle, barClass, barStyle } = common_vendor.useTabsCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.offsetTop
      }, _ctx.offsetTop ? {
        b: common_vendor.n(common_vendor.unref(ns).e("top-placeholder")),
        c: `${_ctx.offsetTop}px`
      } : {}, {
        d: _ctx.bar || _ctx.$slots.bar
      }, _ctx.bar || _ctx.$slots.bar ? {
        e: common_vendor.n(common_vendor.unref(barClass)),
        f: common_vendor.s(common_vendor.unref(barStyle)),
        g: common_vendor.unref(barComponentId),
        h: common_vendor.n(common_vendor.unref(ns).e("bar-container")),
        i: `${common_vendor.unref(barOffsetLeft)}px`,
        j: `${common_vendor.unref(barOffsetLeft) && common_vendor.unref(tabItems).length ? 1 : 0}`
      } : {}, {
        k: common_vendor.n(common_vendor.unref(ns).e("container")),
        l: common_vendor.n(common_vendor.unref(ns).is("scroll", _ctx.scroll)),
        m: common_vendor.n(common_vendor.unref(ns).is("no-bar", !common_vendor.unref(showBar))),
        n: common_vendor.n(common_vendor.unref(ns).e("scroll-view")),
        o: common_vendor.unref(common_vendor.formatDomSizeValue)(_ctx.height || "100%"),
        p: _ctx.scroll,
        q: common_vendor.unref(scrollLeft),
        r: common_vendor.unref(componentId),
        s: common_vendor.n(common_vendor.unref(tabsClass)),
        t: common_vendor.s(common_vendor.unref(tabsStyle))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e28e073f"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue"]]);
wx.createComponent(Component);
