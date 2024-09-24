<template>
	<view class="container">
		<view class="title">{{ style }}</view>
		<view class="charts-box">
			<qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
		</view>
		<view class="suggestion">
			<view class="sub-title">饮食建议</view>
			<view style="padding: 10rpx 0;">{{ content }}</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request'
	import TnReadMore from '@tuniao/tnui-vue3-uniapp/components/read-more/src/read-more.vue';
	// import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue';
	// import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp/components/modal';
	export default {
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#1890FF", "#FAC858", "#73C0DE"
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
				style: '',
				// suggestion: '',
				content: ''
			};
			
		},
		components: {
			TnReadMore,
		},
		

		
		onReady() {
			this.getServerData();
		},
		
		onLoad(option) {
			this.style = option.style + '分析';
			request.get('/dietAdvice', { params: { id: option.id, key: option.str } }).then(res => {
				if (res.code === 1) {
					this.content = res.data
				}
			})
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
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
				uni.showModal({
					title: '会员专享权益',
					content: '加入会员可以查看全部建议',
					confirmText: '加入会员',
					success: function (res) {
						if (res.confirm) {
							uni.hideToast();
						} else if (res.cancel) {
							uni.hideToast();
						}
					}
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		
		.title {
			width: 89vw;
			font-size: 16px;
			text-align: center;
		}
		
		.charts-box {
			width: 200px;
			height: 200px;
			margin-top: 20rpx;
		}
		
		.suggestion {
			width: 89%;
			height: 100px;
			margin-top: 20rpx;
			
			.sub-title {
				font-size: 13px;
				color: #0099CC;
			}
		}
	}
</style>