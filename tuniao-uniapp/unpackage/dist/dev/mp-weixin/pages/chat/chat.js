"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //键盘高度
      keyboardHeight: 0,
      //底部消息发送高度
      bottomHeight: 0,
      //滚动距离
      scrollTop: 0,
      userId: "",
      socketTask: null,
      // 确保websocket是打开状态
      is_open_socket: false,
      //发送的消息
      chatMsg: "",
      msgList: [
        {
          botContent: "你好呀！我是大熊猫伴伴，是你饮食管理上的朋友，接下来就由我陪着你咯~",
          userContent: "",
          image: "../../static/standard.png"
        }
      ],
      index: 0
    };
  },
  updated() {
    this.scrollToBottom();
  },
  computed: {
    windowHeight() {
      return this.rpxTopx(common_vendor.index.getSystemInfoSync().windowHeight);
    },
    // 键盘弹起来的高度+发送框高度
    inputHeight() {
      return this.bottomHeight + this.keyboardHeight;
    }
  },
  onLoad() {
    this.socketTask = common_vendor.index.connectSocket({
      url: "ws://localhost:9999",
      success(data) {
        console.log("websocket连接成功");
      }
    });
    this.socketTask.onOpen((res) => {
      console.log("WebSocket连接正常打开中...！");
      this.is_open_socket = true;
    });
    this.socketTask.onMessage((res) => {
      if (res.data != "回复结束") {
        let date = /* @__PURE__ */ new Date();
        console.log("收到后端消息: " + date);
        console.time("onMsg");
        this.msg += res.data;
        console.log("收到后端回复: " + this.msg);
        console.timeEnd("onMsg");
        this.msgList[this.index].botContent = this.msg.replace("undefined", "");
      }
      if (res.data === "回复结束") {
        this.msg = "";
      }
    });
    this.socketTask.onClose(() => {
      console.log("已经被关闭了");
    });
    common_vendor.index.onKeyboardHeightChange((res) => {
      this.keyboardHeight = this.rpxTopx(res.height);
      if (this.keyboardHeight < 0)
        this.keyboardHeight = 0;
    });
  },
  onUnload() {
  },
  methods: {
    goback() {
      common_vendor.index.switchTab({
        url: "/pages/tutorship/tutorship"
      });
    },
    focus() {
      this.scrollToBottom();
    },
    blur() {
      this.scrollToBottom();
    },
    // px转换成rpx
    rpxTopx(px) {
      let deviceWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      let rpx = 750 / deviceWidth * Number(px);
      return Math.floor(rpx);
    },
    // 监视聊天发送栏高度
    sendHeight() {
      setTimeout(() => {
        let query = common_vendor.index.createSelectorQuery();
        query.select(".send-msg").boundingClientRect();
        query.exec((res) => {
          this.bottomHeight = this.rpxTopx(res[0].height);
        });
      }, 10);
    },
    // 滚动至聊天底部
    scrollToBottom(e) {
      setTimeout(() => {
        let query = common_vendor.index.createSelectorQuery().in(this);
        query.select("#scrollview").boundingClientRect();
        query.select("#msglistview").boundingClientRect();
        query.exec((res) => {
          if (res[1].height > res[0].height) {
            this.scrollTop = this.rpxTopx(res[1].height - res[0].height);
          }
        });
      }, 15);
    },
    // 发送消息
    async handleSend() {
      if (!this.chatMsg || !/^\s+$/.test(this.chatMsg)) {
        let obj = {
          botContent: "",
          userContent: this.chatMsg,
          image: "/static/common/unname.jpg"
        };
        this.msgList.push(obj);
        let obj1 = {
          botContent: "  ",
          userContent: "",
          image: "../../static/standard.png"
        };
        this.msgList.push(obj1);
        if (this.is_open_socket) {
          console.time("sendMsg");
          await this.socketTask.send({
            data: "1"
          });
          console.timeEnd("sendMsg");
          console.time("sendMsg1");
          await this.socketTask.send({
            data: this.chatMsg
          });
          console.timeEnd("sendMsg1");
        }
        this.chatMsg = "";
        this.scrollToBottom();
        this.index += 2;
      } else {
        this.$modal.showToast("不能发送空白消息");
      }
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  _component_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.goback()),
    b: common_vendor.p({
      name: "arrow-left",
      size: "20px",
      color: "#000"
    }),
    c: common_vendor.f($data.msgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.userContent != ""
      }, item.userContent != "" ? {
        b: common_vendor.t(item.userContent),
        c: item.image
      } : {}, {
        d: item.botContent != ""
      }, item.botContent != "" ? {
        e: item.image,
        f: common_vendor.t(item.botContent)
      } : {}, {
        g: index
      });
    }),
    d: `${$options.windowHeight - $options.inputHeight - 180}rpx`,
    e: $data.scrollTop,
    f: common_vendor.o((...args) => $options.handleSend && $options.handleSend(...args)),
    g: common_vendor.o((...args) => $options.sendHeight && $options.sendHeight(...args)),
    h: common_vendor.o((...args) => $options.focus && $options.focus(...args)),
    i: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    j: $data.chatMsg,
    k: common_vendor.o(($event) => $data.chatMsg = $event.detail.value),
    l: common_vendor.o((...args) => $options.handleSend && $options.handleSend(...args)),
    m: `${$data.keyboardHeight - 60}rpx`,
    n: `${$options.inputHeight}rpx`
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0a633310"], ["__file", "D:/uniapp/diet_management/uniapp1/Diet/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
