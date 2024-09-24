<template>
	<view class="container">
		<view class="notice">
			<uni-notice-bar show-icon show-close scrollable text="饮食陪伴官是一个致力于通过饮食改善用户面临问题的原生大模型小程序. "></uni-notice-bar>
		</view>
		<view class="chat">
			<scroll-view :style="{height: `${windowHeight}rpx`}" :scroll-y="true" :scroll-top="scrollTop"
				:scroll-with-animation="true" class="scroll-view" :scroll-into-view="scrollId">
				<!-- 聊天主体 -->
				<view id="msglistview" class="chat-body">
					<!-- 聊天记录 -->
					<view v-for="(item,index) in msgList" :key="index" :id="'message-' + index">

			<scroll-view :style="{height: `${windowHeight}rpx`}" id="scrollview" scroll-y="true" :scroll-top="scrollTop"
				:scroll-with-animation="true" class="scroll-view">
				<!-- 聊天主体 -->
				<view id="msglistview" class="chat-body">
					<!-- 聊天记录 -->
					<view v-for="(item,index) in msgList" :key="index">

						<!-- 自己发的消息 -->
						<view class="item self" v-if="item.userContent != ''">
							<!-- 文字内容 -->
							<view class="content right">
								{{item.userContent}}
							</view>
							<!-- 头像 -->
							<view class="avatar">

							</view>
						</view>
						<!-- 机器人发的消息 -->
						<view class="item Ai" v-if="item.botContent != ''">
							<!-- 头像 -->
							<view class="avatar">
								<image src="../../static/standard.png"></image>
							</view>
							<!-- 文字内容 -->

							<view class="content left" v-html="item.botContent">

							<view class="content left">
								{{item.botContent}}

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 底部消息发送栏 -->
			<!-- 用来占位，防止聊天消息被发送框遮挡 -->
			<view class="chat-bottom">
				<view class="send-msg">
					<view class="uni-textarea">

						<textarea v-model="chatMsg" maxlength="300" :show-confirm-bar="false" auto-height
							:disabled="send"></textarea>
					</view>
					<button class="send-btn" @click="clickRequest">发送</button>
				</view>
			</view>
		</view>


						<textarea v-model="chatMsg" maxlength="300" :show-confirm-bar="false" auto-height></textarea>
					</view>
					<button @click="handleSend" class="send-btn">发送</button>
				</view>
			</view>
		</view>
		

		<nut-popup position="left" v-model:visible="navOrNot">
			左侧导航栏
		</nut-popup>
	</view>
</template>
<script>

	import request from '../../utils/request.ts'
	import ReconnectingWebSocket from 'reconnecting-websocket';
	import {
		nextTick
	} from 'vue'

	export default {
		data() {
			return {
				//滚动距离
				scrollTop: 0,

				scrollId: '',
				id: 10,
				send: false,
				//发送的消息
				chatMsg: '',
				msgList: [{
					botContent: "hello，请问我有什么可以帮助你的吗？",
					recordId: 0,
					titleId: 0,
					userContent: "",
					userId: 0
				}, ],
				navOrNot: false,
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				answer: ''

				userId: '',
				//发送的消息
				chatMsg: "",
				msgList: [{
						botContent: "hello，请问我有什么可以帮助你的吗？",
						recordId: 0,
						titleId: 0,
						userContent: "",
						userId: 0
					},
					{
						botContent: "",
						recordId: 0,
						titleId: 0,
						userContent: "你好呀我想问你一件事",
						userId: 0
					},
				],
				navOrNot: false

			}
		},
		computed: {
			windowHeight() {
				return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
			}
		},
		methods: {



			// px转换成rpx
			rpxTopx(px) {
				let deviceWidth = wx.getSystemInfoSync().windowWidth
				let rpx = (750 / deviceWidth) * Number(px)
				return Math.floor(rpx)
			},


			toBottom() {
				nextTick(() => {
					this.scrollId = 'message-' + this.msgList.length - 1;
				})
			},

			// 发送消息
			handleSend() {
				//如果消息不为空
				if (!this.chatMsg || !/^\s+$/.test(this.chatMsg)) {
					let obj = {
						botContent: "",
						recordId: 0,
						titleId: 0,
						userContent: this.chatMsg,
						userId: 0
					}
					this.msgList.push(obj);

					this.toBottom();

					this.chatMsg = '';

				} else if (this.chatMsg == '') {
					uni.showToast({
						title: '输入内容不能为空',
					})
				}
			},


			chat() {
				// this.handleSend();
				let chat = this.chatMsg
				// this.chatMsg = '请耐心等待片刻~';
				// this.send = true,
				// request.get('/Diet', {
				// 	params: {
				// 		id: this.id,
				// 		key: chat
				// 	}
				// }).then(res => {
				// 	if (res.code === 1){
				// 	console.log('当前响应结果: ' +res.data);
				// 	let obj1 = {
				// 		botContent: res.data,
				// 		recordId: 0,
				// 		titleId: 0,
				// 		userContent: "",
				// 		userId: 0
				// 	};
				// 	obj1.botContent.replace('/<br/><br/>', '<br/>');
				this.msgList.push(obj1);
				this.toBottom();
				this.chatMsg = '';
				this.send = false;
				// 	}
				// })
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				this.socketTask.close({
					success(res) {
						this.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			async clickRequest() {
				let msg = this.chatMsg
				if (this.is_open_socket) {
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					await this.socketTask.send({
						data: 1,
					})
					this.socketTask.send({
						data: msg
					})
				}
			}
		},

		onLoad() {
			// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
			this.socketTask = uni.connectSocket({

				url: "ws://localhost:9999",
				success(data) {
					console.log("websocket连接成功");
				},
			});
			
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			this.socketTask.onOpen(async(res) => {
				console.log("WebSocket连接正常打开中...！");
				this.is_open_socket = true;
				// 注：只有连接正常打开中 ，才能正常成功发送消息
				// await this.socketTask.send({
				// 	data: 1,
				// })
				// this.socketTask.send({
				// 	data: '你好, 你叫什么名字'
				// })
			});
			// 注：只有连接正常打开中 ，才能正常收到消息
			this.socketTask.onMessage((res) => {
				// console.log("收到服务器内容：" + res.data);
				this.answer += res.data
				// let obj1 = {
				// 		botContent: answer,
				// 		recordId: 0,
				// 		titleId: 0,
				// 		userContent: "",
				// 		userId: 0
				// 	};
				console.log('收到后端回复: ' +this.answer)
				// this.msgList.push(obj1);
			});
			// 这里仅是事件监听【如果socket关闭了会执行】
			this.socketTask.onClose(() => {
				console.log("已经被关闭了")
			});
		},
		
		beforeDestroy() {
			this.closeSocket();

		}
	}
</script>
<style lang="scss" scoped>
	$chatContentbgc: #C2DCFF;
	$sendBtnbgc: #0099CC;

	view,
	button,
	text,
	input,
	textarea {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.container {
		.notice {
			// width: 89vw;

		}


		/* 聊天消息 */
		.chat {
			.scroll-view {
				::-webkit-scrollbar {
					display: none;
					width: 0 !important;
					height: 0 !important;
					-webkit-appearance: none;
					background: transparent;
					color: transparent;
				}

				// background-color: orange;
				background-color: #F6F6F6;

				.chat-body {
					display: flex;
					flex-direction: column;
					padding-top: 23rpx;
					// background-color:skyblue;

					.self {
						justify-content: flex-end;
					}

					.item {
						display: flex;
						padding: 23rpx 30rpx;
						// background-color: greenyellow;

						.right {
							background-color: $chatContentbgc;
						}

						.left {
							background-color: #FFFFFF;
						}

						// 聊天消息的三角形
						.right::after {
							position: absolute;
							display: inline-block;
							content: '';
							width: 0;
							height: 0;
							left: 100%;
							top: 10px;
							border: 12rpx solid transparent;
							border-left: 12rpx solid $chatContentbgc;
						}

						.left::after {
							position: absolute;
							display: inline-block;
							content: '';
							width: 0;
							height: 0;
							top: 10px;
							right: 100%;
							border: 12rpx solid transparent;
							border-right: 12rpx solid #FFFFFF;
						}

						.content {
							position: relative;
							max-width: 486rpx;
							border-radius: 8rpx;
							word-wrap: break-word;
							padding: 24rpx 24rpx;
							margin: 0 24rpx;
							border-radius: 5px;
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 42rpx;
						}

						.avatar {
							// display: flex;
							// justify-content: center;
							width: 78rpx;
							height: 78rpx;
							// background: #;
							border-radius: 50%;
							border: 1px solid grey;
							// overflow: hidden;

							image {
								width: 78rpx;
								height: 78rpx;
								// align-self: center;
							}

						}
					}
				}
			}

			/* 底部聊天发送栏 */
			.chat-bottom {
				width: 100%;
				height: 100rpx;
				background: #F4F5F7;

				.send-msg {
					display: flex;
					width: 100%;
					min-height: 100rpx;
					position: fixed;
					bottom: 0;
					background: #EDEDED;

					textarea {
						width: 573rpx;
						min-height: 69rpx;
						max-height: 139rpx;
						background: #FFFFFF;
						border-radius: 6rpx;
						font-size: 32rpx;
						color: #333333;
						line-height: 63rpx;
						margin-left: 6rpx;
						margin-top: 19rpx;
						// cursor-color: #0099CC;
					}

					.send-btn {
						width: 139rpx;
						font-size: 27rpx;
						height: 69rpx;
						margin-left: 17rpx;
						margin-top: 19rpx;
						background-color: $sendBtnbgc;
					}

	
	.container {
		.notice {
			// width: 89vw;
			
		}
	

	/* 聊天消息 */
	.chat {
		.scroll-view {
			::-webkit-scrollbar {
				display: none;
				width: 0 !important;
				height: 0 !important;
				-webkit-appearance: none;
				background: transparent;
				color: transparent;
			}

			// background-color: orange;
			background-color: #F6F6F6;

			.chat-body {
				display: flex;
				flex-direction: column;
				padding-top: 23rpx;
				// background-color:skyblue;

				.self {
					justify-content: flex-end;
				}

				.item {
					display: flex;
					padding: 23rpx 30rpx;
					// background-color: greenyellow;

					.right {
						background-color: $chatContentbgc;
					}

					.left {
						background-color: #FFFFFF;
					}

					// 聊天消息的三角形
					.right::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						left: 100%;
						top: 10px;
						border: 12rpx solid transparent;
						border-left: 12rpx solid $chatContentbgc;
					}

					.left::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						top: 10px;
						right: 100%;
						border: 12rpx solid transparent;
						border-right: 12rpx solid #FFFFFF;
					}

					.content {
						position: relative;
						max-width: 486rpx;
						border-radius: 8rpx;
						word-wrap: break-word;
						padding: 24rpx 24rpx;
						margin: 0 24rpx;
						border-radius: 5px;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 42rpx;
					}

					.avatar {
						// display: flex;
						// justify-content: center;
						width: 78rpx;
						height: 78rpx;
						// background: #;
						border-radius: 50%;
						border: 1px solid grey;
						// overflow: hidden;

						image {
							width: 78rpx;
							height: 78rpx;
							// align-self: center;
						}

					}
				}
			}
		}

		/* 底部聊天发送栏 */
		.chat-bottom {
			width: 100%;
			height: 100rpx;
			background: #F4F5F7;

			.send-msg {
				display: flex;
				width: 100%;
				min-height: 100rpx;
				position: fixed;
				bottom: 0;
				background: #EDEDED;

				textarea {
					width: 573rpx;
					min-height: 69rpx;
					max-height: 139rpx;
					background: #FFFFFF;
					border-radius: 6rpx;
					font-size: 32rpx;
					color: #333333;
					line-height: 43rpx;
					margin-left: 6rpx;
					margin-top: 19rpx;
					// cursor-color: #0099CC;
				}

				.send-btn {
					width: 139rpx;
					font-size: 27rpx;
					height: 69rpx;
					margin-left: 17rpx;
					margin-top: 19rpx;
					background-color: $sendBtnbgc;
				}
			}
		}
	}

	}

</style>