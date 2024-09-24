"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../../icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "read-more",
  props: common_vendor.readMoreProps,
  emits: common_vendor.readMoreEmits,
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const {
      componentContentId,
      showOperationArea,
      foldOperationAreaHeight,
      containerHeight,
      expandStatus,
      toggleExpandStatus,
      resetContentHeight
    } = common_vendor.useReadMore(props, emits);
    const { ns, operationAreaClass, operationAreaStyle } = common_vendor.useReadMoreCustomStyle(props);
    expose({
      /**
       * @description 重新设置内容容器的高度
       */
      resetContentHeight
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(componentContentId),
        b: common_vendor.n(common_vendor.unref(ns).e("content")),
        c: common_vendor.unref(showOperationArea)
      }, common_vendor.unref(showOperationArea) ? common_vendor.e({
        d: !common_vendor.unref(expandStatus)
      }, !common_vendor.unref(expandStatus) ? {
        e: common_vendor.t(_ctx.expandText),
        f: common_vendor.p({
          name: _ctx.expandIcon
        }),
        g: common_vendor.n(common_vendor.unref(ns).e("operation-content"))
      } : {
        h: common_vendor.t(_ctx.foldText),
        i: common_vendor.p({
          name: _ctx.foldIcon
        }),
        j: common_vendor.n(common_vendor.unref(ns).e("operation-content")),
        k: `${common_vendor.unref(foldOperationAreaHeight)}rpx`
      }, {
        l: common_vendor.n(common_vendor.unref(operationAreaClass)),
        m: common_vendor.n(common_vendor.unref(expandStatus) ? common_vendor.unref(ns).is("fold") : common_vendor.unref(ns).is("expand")),
        n: common_vendor.s(common_vendor.unref(operationAreaStyle)),
        o: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(toggleExpandStatus) && common_vendor.unref(toggleExpandStatus)(...args)
        )
      }) : {}, {
        p: common_vendor.n(common_vendor.unref(ns).b()),
        q: common_vendor.unref(containerHeight)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9c27c86"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/read-more/src/read-more.vue"]]);
wx.createComponent(Component);
