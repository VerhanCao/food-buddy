"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "footer",
  props: common_vendor.footerProps,
  emits: common_vendor.footerEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const { navigatorData, footerClickEvent, navigatorClickEvent } = common_vendor.useFooter(
      props,
      emits
    );
    const {
      ns,
      footerClass,
      footerStyle,
      contentClass,
      contentStyle,
      navigatorClass,
      navigatorStyle
    } = common_vendor.useFooterCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(navigatorData).length
      }, common_vendor.unref(navigatorData).length ? {
        b: common_vendor.f(common_vendor.unref(navigatorData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index,
            c: common_vendor.n(common_vendor.unref(navigatorClass)(item)),
            d: common_vendor.s(common_vendor.unref(navigatorStyle)(item)),
            e: common_vendor.o(($event) => common_vendor.unref(navigatorClickEvent)(item), index)
          };
        }),
        c: common_vendor.n(common_vendor.unref(ns).e("navigators"))
      } : {}, {
        d: _ctx.content
      }, _ctx.content ? {
        e: common_vendor.t(_ctx.content),
        f: common_vendor.n(common_vendor.unref(contentClass)),
        g: common_vendor.s(common_vendor.unref(contentStyle))
      } : {}, {
        h: common_vendor.n(common_vendor.unref(footerClass)),
        i: common_vendor.s(common_vendor.unref(footerStyle)),
        j: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(footerClickEvent) && common_vendor.unref(footerClickEvent)(...args)
        )
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f61473ab"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/footer/src/footer.vue"]]);
wx.createComponent(Component);
