"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnPopup();
}
const TnPopup = () => "../../popup/src/popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "picker",
  props: common_vendor.pickerProps,
  emits: common_vendor.pickerEmits,
  setup(__props, { expose }) {
    const props = __props;
    const {
      openPopup,
      showPicker,
      pickerData,
      currentPickerIndex,
      closePopupEvent,
      pickerViewChangeEvent,
      confirmEvent,
      cancelEvent,
      initDefaultPickerIndex,
      resetPickerIndexWithPosition
    } = common_vendor.usePicker(props);
    const { ns, overlayOpacity, operationBtnClass, operationBtnStyle } = common_vendor.usePickerCustomStyle(props);
    const resetPickerViewIndex = () => {
      initDefaultPickerIndex();
    };
    expose({
      /**
       * @description: 重置选择器的值
       */
      resetPickerViewIndex,
      /**
       * @description: 重置指定位置选择器的值
       */
      resetPickerIndexWithPosition
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showCancel
      }, _ctx.showCancel ? {
        b: common_vendor.t(props.cancelText),
        c: common_vendor.n(common_vendor.unref(operationBtnClass)("cancel")),
        d: common_vendor.s(common_vendor.unref(operationBtnStyle)("cancel")),
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(cancelEvent) && common_vendor.unref(cancelEvent)(...args)
        )
      } : {}, {
        f: common_vendor.t(props.confirmText),
        g: common_vendor.n(common_vendor.unref(operationBtnClass)("confirm")),
        h: common_vendor.s(common_vendor.unref(operationBtnStyle)("confirm")),
        i: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(confirmEvent) && common_vendor.unref(confirmEvent)(...args)
        ),
        j: common_vendor.n(common_vendor.unref(ns).e("operation")),
        k: common_vendor.n(common_vendor.unref(ns).is("only-confirm", !_ctx.showCancel)),
        l: common_vendor.unref(showPicker)
      }, common_vendor.unref(showPicker) ? {
        m: common_vendor.f(common_vendor.unref(pickerData), (item, index, i0) => {
          return {
            a: common_vendor.f(item, (dItem, dIndex, i1) => {
              return {
                a: common_vendor.t(dItem["label"]),
                b: dIndex
              };
            }),
            b: index
          };
        }),
        n: common_vendor.n(common_vendor.unref(ns).em("content-item", "data")),
        o: common_vendor.n(common_vendor.unref(ns).e("content-item")),
        p: common_vendor.n(common_vendor.unref(ns).e("picker-view-column")),
        q: common_vendor.n(common_vendor.unref(ns).e("picker-view")),
        r: common_vendor.unref(currentPickerIndex),
        s: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(pickerViewChangeEvent) && common_vendor.unref(pickerViewChangeEvent)(...args)
        )
      } : {}, {
        t: common_vendor.n(common_vendor.unref(ns).e("content")),
        v: common_vendor.n(common_vendor.unref(ns).b()),
        w: common_vendor.o(common_vendor.unref(closePopupEvent)),
        x: common_vendor.o(($event) => common_vendor.isRef(openPopup) ? openPopup.value = $event : null),
        y: common_vendor.p({
          ["open-direction"]: "bottom",
          overlay: true,
          ["overlay-opacity"]: common_vendor.unref(overlayOpacity),
          radius: 0,
          ["safe-area-inset-bottom"]: false,
          ["z-index"]: _ctx.zIndex,
          modelValue: common_vendor.unref(openPopup)
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33c7c90b"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue"]]);
wx.createComponent(Component);
