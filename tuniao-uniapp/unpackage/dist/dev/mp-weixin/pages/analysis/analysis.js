"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const TnReadMore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/read-more/src/read-more.js";
const _sfc_main = {
  data() {
    return {
      chartData: {},
      opts: {
        color: [
          "#1890FF",
          "#FAC858",
          "#73C0DE"
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      },
      style: "",
      // suggestion: '',
      content: ""
    };
  },
  components: {
    TnReadMore
  },
  onReady() {
    this.getServerData();
  },
  onLoad(option) {
    this.style = option.style + "分析";
    utils_request.request.get("/dietAdvice", { params: { id: option.id, key: option.str } }).then((res) => {
      if (res.code === 1) {
        this.content = res.data;
      }
    });
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        let res = {
          series: [{
            data: [{
              "name": "碳水",
              "value": 50
            }, {
              "name": "蛋白质",
              "value": 30
            }, {
              "name": "脂肪",
              "value": 20
            }]
          }]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    openContent() {
      common_vendor.index.showModal({
        title: "会员专享权益",
        content: "加入会员可以查看全部建议",
        confirmText: "加入会员",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.hideToast();
          } else if (res.cancel) {
            common_vendor.index.hideToast();
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.style),
    b: common_vendor.p({
      type: "pie",
      opts: $data.opts,
      chartData: $data.chartData
    }),
    c: common_vendor.t($data.content)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3a142df1"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/analysis/analysis.vue"]]);
wx.createPage(MiniProgramPage);
