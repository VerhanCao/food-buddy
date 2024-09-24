"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (TnSearchBox + TnTabsItem + TnTabs + TnNumberBox + TnIcon + TnBadge + TnButton + TnSwiper + TnInput + TnFormItem + TnPicker + TnForm + TnPopup + TnModal)();
}
const TnPicker = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/picker/src/picker.js";
const TnInput = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/input/src/input.js";
const TnForm = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/form/src/form.js";
const TnFormItem = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/form/src/form-item.js";
const TnSwiper = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.js";
const TnModal = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/modal/src/modal.js";
const TnPopup = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/popup/src/popup.js";
const TnBadge = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/badge/src/badge.js";
const TnSearchBox = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.js";
const TnIcon = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/icon/src/icon.js";
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnNumberBox = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.js";
const TnTabs = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.js";
const TnTabsItem = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "upload",
  setup(__props) {
    let openPick = common_vendor.ref(false);
    let styles = ["早餐", "中餐", "晚餐", "副食", "运动"];
    let visible = common_vendor.ref(false);
    let currentIndex1 = common_vendor.ref(0);
    let open = common_vendor.ref(false);
    let many1 = common_vendor.ref(1);
    let modalRef = common_vendor.ref();
    let searchValue = common_vendor.ref("");
    let current = common_vendor.ref(0);
    const formRef = common_vendor.ref();
    let selected = common_vendor.ref([]);
    const Img = [
      "../../static/carousel/1.jpg",
      "../../static/carousel/2.WEBP",
      "../../static/carousel/3.jpg"
    ];
    const state = common_vendor.reactive({
      tabList: [
        { text: "常用" },
        { text: "自定义" },
        { text: "收藏" }
      ],
      tableData: [
        { id: 1, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 },
        { id: 2, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 },
        { id: 3, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 },
        { id: 4, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 },
        { id: 5, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 },
        { id: 6, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 },
        { id: 7, name: "米饭", CH: 100, EW: 100, FAT: 100, rate: 5, path: "/static/diet/rice.jpg", flag: false, many: 1 }
      ],
      arr1: [],
      params: {
        userId: 1,
        name: "",
        style: "早餐",
        many: "",
        note: ""
      }
    });
    const rules = {
      name: [
        { required: true, message: "菜品名不为空", trigger: "blur" }
      ],
      style: [
        { required: true, message: "请选择一个类型", trigger: ["change", "blur"] }
      ],
      many: [
        { required: true, message: "份量不为空", trigger: "blur" }
      ]
    };
    const submit = async () => {
      var _a;
      await ((_a = formRef.value) == null ? void 0 : _a.validate());
    };
    const search = () => {
    };
    const choose = (diet) => {
      diet.flag = !diet.flag;
      if (diet.flag)
        selected.value.push(diet);
      else
        selected.value.splice(selected.value.indexOf(diet), 1);
    };
    const show = () => {
      open.value = true;
    };
    const showModal = (diet) => {
      var _a;
      many1.value = diet.many;
      (_a = modalRef.value) == null ? void 0 : _a.showModal({
        title: "填选菜品份量",
        showCancel: true,
        confirmText: "确定",
        cancelText: "取消",
        cancel: () => {
        },
        confirm: () => {
          diet.many = many1.value;
          common_vendor.index.showToast({
            title: "修改成功"
          });
        }
      });
    };
    const record = () => {
    };
    const remove = (diet) => {
      diet.flag = false;
      selected.value = selected.value.filter((item) => item.id != diet.id);
      common_vendor.index.showToast({
        title: "成功"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => search()),
        b: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        c: common_vendor.p({
          placeholder: "输入菜品关键字完成检索",
          size: "sm",
          modelValue: common_vendor.unref(searchValue)
        }),
        d: common_vendor.f(state.tabList, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = index : current = index, index),
            c: "aa5cff34-2-" + i0 + ",aa5cff34-1",
            d: common_vendor.p({
              title: item.text
            })
          };
        }),
        e: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = $event : current = $event),
        f: common_vendor.p({
          height: "100rpx",
          ["font-size"]: "32",
          ["bar-width"]: "60",
          scroll: false,
          modelValue: common_vendor.unref(current)
        }),
        g: common_vendor.unref(current) === 0
      }, common_vendor.unref(current) === 0 ? {
        h: common_vendor.f(state.tableData, (item, k0, i0) => {
          return {
            a: item.id,
            b: item.flag,
            c: common_vendor.o(($event) => choose(item), item.id),
            d: common_vendor.t(item.name),
            e: "aa5cff34-3-" + i0,
            f: common_vendor.o(($event) => item.many = $event, item.id),
            g: common_vendor.p({
              min: 1,
              modelValue: item.many
            }),
            h: item.flag === true,
            i: item.id
          };
        }),
        i: common_vendor.p({
          name: "eat-other-fill"
        }),
        j: common_vendor.p({
          value: `${common_vendor.unref(selected).length}条`,
          type: "primary",
          bold: true
        }),
        k: common_vendor.p({
          name: "down"
        }),
        l: common_vendor.o(($event) => show()),
        m: common_vendor.p({
          text: true,
          type: "primary"
        })
      } : common_vendor.unref(current) === 1 ? {
        o: common_vendor.w(({
          data
        }, s0, i0) => {
          return {
            a: data,
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "o",
          vueId: "aa5cff34-8"
        }),
        p: common_vendor.o(($event) => common_vendor.isRef(currentIndex1) ? currentIndex1.value = $event : currentIndex1 = $event),
        q: common_vendor.p({
          data: Img,
          indicator: true,
          ["indicator-type"]: "line",
          autoplay: true,
          modelValue: common_vendor.unref(currentIndex1)
        }),
        r: common_vendor.p({
          name: "upload-simple",
          type: "primary",
          size: "100rpx"
        }),
        s: common_vendor.o(($event) => common_vendor.isRef(visible) ? visible.value = true : visible = true)
      } : {}, {
        n: common_vendor.unref(current) === 1,
        t: common_vendor.o(($event) => state.params.name = $event),
        v: common_vendor.p({
          underline: true,
          modelValue: state.params.name
        }),
        w: common_vendor.p({
          label: "菜品名",
          prop: "name"
        }),
        x: common_vendor.o(($event) => state.params.many = $event),
        y: common_vendor.p({
          type: "number",
          underline: true,
          modelValue: state.params.many
        }),
        z: common_vendor.p({
          label: "份量",
          prop: "many"
        }),
        A: common_vendor.o(($event) => common_vendor.isRef(openPick) ? openPick.value = true : openPick = true),
        B: common_vendor.o(($event) => state.params.style = $event),
        C: common_vendor.p({
          type: "select",
          underline: true,
          modelValue: state.params.style
        }),
        D: common_vendor.o(($event) => state.params.style = $event),
        E: common_vendor.o(($event) => common_vendor.isRef(openPick) ? openPick.value = $event : openPick = $event),
        F: common_vendor.p({
          data: common_vendor.unref(styles),
          modelValue: state.params.style,
          open: common_vendor.unref(openPick)
        }),
        G: common_vendor.p({
          label: "类型",
          prop: "style"
        }),
        H: common_vendor.o(submit),
        I: common_vendor.p({
          size: "lg",
          type: "primary"
        }),
        J: common_vendor.sr(formRef, "aa5cff34-11,aa5cff34-10", {
          "k": "formRef"
        }),
        K: common_vendor.p({
          model: state.params,
          ["label-position"]: "right",
          rules
        }),
        L: common_vendor.o(($event) => common_vendor.isRef(visible) ? visible.value = $event : visible = $event),
        M: common_vendor.p({
          modelValue: common_vendor.unref(visible)
        }),
        N: common_vendor.f(common_vendor.unref(selected), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.many),
            d: "aa5cff34-22-" + i0 + "," + ("aa5cff34-21-" + i0),
            e: common_vendor.o(($event) => showModal(item), index),
            f: "aa5cff34-21-" + i0 + ",aa5cff34-20",
            g: common_vendor.o(($event) => remove(item), index),
            h: "aa5cff34-23-" + i0 + ",aa5cff34-20",
            i: index
          };
        }),
        O: common_vendor.p({
          name: "edit"
        }),
        P: common_vendor.p({
          name: "delete",
          type: "danger"
        }),
        Q: common_vendor.o(record),
        R: common_vendor.p({
          text: true,
          type: "primary"
        }),
        S: common_vendor.o(($event) => common_vendor.isRef(open) ? open.value = $event : open = $event),
        T: common_vendor.p({
          ["open-direction"]: "bottom",
          height: "700",
          modelValue: common_vendor.unref(open)
        }),
        U: common_vendor.o(($event) => common_vendor.isRef(many1) ? many1.value = $event : many1 = $event),
        V: common_vendor.p({
          min: 1,
          step: 1,
          modelValue: common_vendor.unref(many1)
        }),
        W: common_vendor.sr(modalRef, "aa5cff34-25", {
          "k": "modalRef"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa5cff34"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/upload/upload.vue"]]);
wx.createPage(MiniProgramPage);
