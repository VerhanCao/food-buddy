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
  __name: "swiper",
  props: common_vendor.swiperProps,
  emits: common_vendor.swiperEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const {
      swiperData,
      currentSwiperIndex,
      swiperCount,
      swiperChangeHandle,
      itemClickHandle
    } = common_vendor.useSwiper(props, emits);
    const { ns, swiperStyle, indicatorColorClass, indicatorColorStyle } = common_vendor.useSwiperCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(swiperData), (item, index, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              active: index === common_vendor.unref(currentSwiperIndex),
              data: item
            }, i0),
            c: index
          };
        }),
        b: common_vendor.n(common_vendor.unref(ns).e("swiper-item")),
        c: common_vendor.n(common_vendor.unref(ns).e("swiper")),
        d: common_vendor.unref(currentSwiperIndex),
        e: _ctx.autoplay,
        f: _ctx.interval,
        g: _ctx.duration,
        h: _ctx.loop,
        i: _ctx.previousMargin,
        j: _ctx.nextMargin,
        k: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(swiperChangeHandle) && common_vendor.unref(swiperChangeHandle)(...args)
        ),
        l: common_vendor.n(common_vendor.unref(ns).e("wrapper")),
        m: _ctx.indicator
      }, _ctx.indicator ? common_vendor.e({
        n: _ctx.indicatorType === "line"
      }, _ctx.indicatorType === "line" ? {
        o: common_vendor.n(common_vendor.unref(indicatorColorClass)(true)),
        p: common_vendor.s(common_vendor.unref(indicatorColorStyle)(true)),
        q: `${(100 / common_vendor.unref(swiperData).length).toFixed(2)}%`,
        r: `translateX(${100 * common_vendor.unref(currentSwiperIndex)}%)`,
        s: common_vendor.n(common_vendor.unref(indicatorColorClass)(false)),
        t: common_vendor.s(common_vendor.unref(indicatorColorStyle)(false)),
        v: common_vendor.n(common_vendor.unref(ns).e("indicator-line"))
      } : {}, {
        w: _ctx.indicatorType === "dot"
      }, _ctx.indicatorType === "dot" ? {
        x: common_vendor.f(common_vendor.unref(swiperCount), (_, i, i0) => {
          return {
            a: i,
            b: common_vendor.n(common_vendor.unref(indicatorColorClass)(i === common_vendor.unref(currentSwiperIndex))),
            c: common_vendor.n({
              active: i === common_vendor.unref(currentSwiperIndex)
            }),
            d: common_vendor.s(common_vendor.unref(indicatorColorStyle)(i === common_vendor.unref(currentSwiperIndex)))
          };
        }),
        y: common_vendor.n(common_vendor.unref(ns).e("indicator-dot"))
      } : {}, {
        z: _ctx.indicatorType === "number"
      }, _ctx.indicatorType === "number" ? {
        A: common_vendor.t(common_vendor.unref(currentSwiperIndex) + 1),
        B: common_vendor.t(common_vendor.unref(swiperCount)),
        C: common_vendor.n(common_vendor.unref(indicatorColorClass)(false)),
        D: common_vendor.s(common_vendor.unref(indicatorColorStyle)(false)),
        E: common_vendor.n(common_vendor.unref(ns).e("indicator-number"))
      } : {}, {
        F: common_vendor.n(common_vendor.unref(ns).e("indicator")),
        G: common_vendor.n(common_vendor.unref(ns).em("indicator", _ctx.indicatorPosition))
      }) : {}, {
        H: common_vendor.n(common_vendor.unref(ns).b()),
        I: common_vendor.s(common_vendor.unref(swiperStyle)),
        J: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(itemClickHandle) && common_vendor.unref(itemClickHandle)(...args)
        )
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp/diet_management/uniapp1/Diet/node_modules/@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue"]]);
wx.createComponent(Component);
