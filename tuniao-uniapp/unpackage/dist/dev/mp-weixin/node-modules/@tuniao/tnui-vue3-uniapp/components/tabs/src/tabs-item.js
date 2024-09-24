"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnBadge();
}
const TnBadge = () => "../../badge/src/badge.js";
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "tabs-item",
  props: common_vendor.tabsItemProps,
  emits: common_vendor.tabsItemEmits,
  setup(__props) {
    const props = __props;
    const { componentId, isActive, hasBadge, itemClickEvent } = common_vendor.useTabsItem(props);
    const { ns, tabsItemClass, tabsItemStyle } = common_vendor.useTabsItemCustomStyle(
      props,
      isActive
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(hasBadge)
      }, common_vendor.unref(hasBadge) ? {
        b: common_vendor.o(common_vendor.unref(itemClickEvent)),
        c: common_vendor.p({
          value: _ctx.badgeConfig.value,
          dot: _ctx.badgeConfig.dot,
          size: _ctx.badgeConfig.dot ? "16" : "",
          type: "danger"
        })
      } : {}, {
        d: common_vendor.t(_ctx.title),
        e: common_vendor.n(common_vendor.unref(ns).e("content__value")),
        f: common_vendor.n(common_vendor.unref(ns).e("content")),
        g: common_vendor.unref(componentId),
        h: common_vendor.n(common_vendor.unref(tabsItemClass)),
        i: common_vendor.s(common_vendor.unref(tabsItemStyle)),
        j: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(itemClickEvent) && common_vendor.unref(itemClickEvent)(...args)
        )
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-47248993"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue"]]);
wx.createComponent(Component);
