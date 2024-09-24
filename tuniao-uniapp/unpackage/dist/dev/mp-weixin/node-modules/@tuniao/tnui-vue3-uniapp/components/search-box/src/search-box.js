"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../../icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search-box",
  props: common_vendor.searchBoxProps,
  emits: common_vendor.searchBoxEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const {
      showPlaceholder,
      inputValue,
      inputFocus,
      searchBoxClickEvent,
      inputFocusEvent,
      inputBlurEvent,
      inputValueEvent,
      clearClickEvent,
      searchBtnClickEvent
    } = common_vendor.useSearchBox(props, emits);
    const {
      ns,
      searchBoxClass,
      searchBoxStyle,
      placeholderClass,
      placeholderStyle,
      searchButtonClass,
      searchButtonStyle
    } = common_vendor.useSearchBoxCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(showPlaceholder)
      }, common_vendor.unref(showPlaceholder) ? common_vendor.e({
        b: _ctx.placeholderIcon
      }, _ctx.placeholderIcon ? {
        c: common_vendor.p({
          name: _ctx.placeholderIcon
        }),
        d: common_vendor.n(common_vendor.unref(ns).e("placeholder-icon"))
      } : {}, {
        e: _ctx.placeholder
      }, _ctx.placeholder ? {
        f: common_vendor.t(_ctx.placeholder),
        g: common_vendor.n(common_vendor.unref(ns).e("placeholder-text"))
      } : {}, {
        h: common_vendor.n(common_vendor.unref(placeholderClass)),
        i: common_vendor.s(common_vendor.unref(placeholderStyle))
      }) : common_vendor.e({
        j: common_vendor.n(common_vendor.unref(ns).e("input")),
        k: common_vendor.n(common_vendor.unref(ns).em("input", _ctx.textAlign)),
        l: common_vendor.unref(inputFocus),
        m: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(inputFocusEvent) && common_vendor.unref(inputFocusEvent)(...args)
        ),
        n: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(inputBlurEvent) && common_vendor.unref(inputBlurEvent)(...args)
        ),
        o: common_vendor.o([
          ($event) => common_vendor.isRef(inputValue) ? inputValue.value = $event.detail.value : null,
          //@ts-ignore
          (...args) => common_vendor.unref(inputValueEvent) && common_vendor.unref(inputValueEvent)(...args)
        ]),
        p: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(searchBtnClickEvent) && common_vendor.unref(searchBtnClickEvent)(...args)
        ),
        q: common_vendor.unref(inputValue),
        r: _ctx.clearable && common_vendor.unref(inputValue)
      }, _ctx.clearable && common_vendor.unref(inputValue) ? {
        s: common_vendor.p({
          name: "close-fill"
        }),
        t: common_vendor.n(common_vendor.unref(ns).e("clear-button")),
        v: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(clearClickEvent) && common_vendor.unref(clearClickEvent)(...args)
        )
      } : {}), {
        w: common_vendor.n(common_vendor.unref(ns).e("content")),
        x: _ctx.searchButton
      }, _ctx.searchButton ? {
        y: common_vendor.t(_ctx.searchButtonText),
        z: common_vendor.n(common_vendor.unref(searchButtonClass)),
        A: common_vendor.s(common_vendor.unref(searchButtonStyle)),
        B: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(searchBtnClickEvent) && common_vendor.unref(searchBtnClickEvent)(...args)
        )
      } : {}, {
        C: common_vendor.n(common_vendor.unref(searchBoxClass)),
        D: common_vendor.s(common_vendor.unref(searchBoxStyle)),
        E: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(searchBoxClickEvent) && common_vendor.unref(searchBoxClickEvent)(...args)
        )
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e939177"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue"]]);
wx.createComponent(Component);
