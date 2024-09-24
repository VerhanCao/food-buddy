<template>
	<view class="container">
		<view class="title">你好, 请先登录</view>
		<image src="../../static/logo.png" style="height: 120rpx;" mode="aspectFit"
			class="animate__animated animate__bounce animate__faster animate__repeat-3" />
		<view class="form">
			<view class="number">
				<tn-input height="69" v-model="state.params.number" placeholder="用户名" underline />
			</view>
			<view class="password">
				<tn-input height="69" v-model="state.params.password" :show-password="false" placeholder="账户密码" type="password"
				underline />
			</view>
			<view class="btn">
				<tn-button width="100" text font-size="21px" @click="login">登录</tn-button>
			</view>
		</view>
		<view class="regist">没有账号？<view style="color: #CCCCCC;" @click="logon()">注册一个<tn-icon name="right-arrow"></tn-icon></view></view>
		  <TnFooter content="copyright © 2024 饮食陪伴官" :offset-bottom="20" />
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
	import 'animate.css';
	import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
	import TnFooter from '@tuniao/tnui-vue3-uniapp/components/footer/src/footer.vue'
	import request from '@/utils/request';

	const state = reactive({
		params: {
			number: '',
			password: '',
		}
	})

	const login = () => {
		// request.post('/login', state.params).then(res => {
		// 	if (res.code === 1) {
		// 		uni.showToast({
		// 			title: '登陆成功',
		// 			duration: 300
		// 		});
				
				uni.switchTab({
					url: '/pages/chat/chat'
				})
			}
	// 	})
	// }
	
	const logon = () => {
		uni.navigateTo({
			url: '/pages/logon/logon'
		})
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.title {
			font-size: 39rpx;
			width: 89vw;
			margin: 20px auto;
			position: absolute;
			top: 20rpx;
			left: 20rpx;
		}

		.form {
			width: 66vw;
			margin-top: 20px;
			font-size: 26rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.number,
			.password {
				margin-top: 10px;
				width: 89%;
			}
			
			.btn {
				margin-top: 10px;
			}
		}
		
		.regist {
			width: 66vw;
			
			view {
				width: 200rpx;
				margin-left: 10rpx;
			}
		}

	}
</style>