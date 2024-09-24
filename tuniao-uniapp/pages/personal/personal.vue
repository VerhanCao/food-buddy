<template>

	<view class="container">
		<view class="top-area">
			<view class="Img">
				<img src="../../static/avatar/rice.jpg" width="100%">
			</view>
			<view class="name">{{ name }}<i class="iconfont icon-VIP"
					style="margin-left: 6rpx; font-size: 66rpx; color: #FF9933;"></i></view>
			<view class="editBtn">
				<TnButton text @click="showPopup = true"><i class="iconfont icon-bianji"></i>编辑个人资料</TnButton>
			</view>
		</view>
		<view class="card-area">
			<view class="card">
				<i class="iconfont icon-goumaihuiyuan" style="font-size: 36px; color: #FF9933; width: fit-content;"></i>
				购买会员
			</view>
			<view class="card">
				<i class="iconfont icon-wodedingdan" style="font-size: 36px; color: #FF9933; width: fit-content;"></i>
				我的订单
			</view>
			<view class="card"><i class="iconfont icon-wodeshoucang"
					style="font-size: 36px; color: #FF9933; width: fit-content;"></i>我的收藏</view>
		</view>
		<view class="nav-card-area">
			<TnListItem width="100%" height="100rpx" radius :bottom-border="true" :bottom-border-indent="true"
				right-icon="right"> 个人资料 </TnListItem>
			<TnListItem width="100%" height="100rpx" radius :bottom-border="true" :bottom-border-indent="true"
				right-icon="right"> 关于我们 </TnListItem>
			<TnListItem width="100%" height="100rpx" radius :bottom-border="true" :bottom-border-indent="true"
				right-icon="right"> 用户协议 </TnListItem>
			<TnListItem width="100%" height="100rpx" radius :bottom-border="true" :bottom-border-indent="true"
				right-icon="right"> 退出登录 </TnListItem>
		</view>
		<view class="page-footer">
			<TnFooter content="Copyright © 饮食陪伴官"></TnFooter>
		</view>
		<TnUpdateUserInfoPopup v-model:show="showPopup" v-model:nickname="name" v-model:avatar="avatar"
			@choose-avatar="avatarChooseHandle" />
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnListItem from '@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue'
import TnUpdateUserInfoPopup from 'tnuiv3p-tn-update-user-info-popup/index.vue'
import TnFooter from '@tuniao/tnui-vue3-uniapp/components/footer/src/footer.vue'
import '../../static/iconfont/iconfont.css'
let name = ref<string>('饿.');
const showPopup = ref<boolean>(false)
const avatar = ref<string>('../../static/avatar/rice.jpg')

// const getAssetURL = (image: any) => {
//     return new URL(`${image}`, import.meta.url).href
// }

const avatarChooseHandle = (url) => {
	// 后端上传接口
	uni.uploadFile({
		url: 'http://localhost:8080/upload/avatar',
		fileType: 'image',
		filePath: url,
		name: 'file',
		success: (res) => {
			const data = JSON.parse(res.data)
			avatar.value = data.data.url
		},
	})
}

const vipPage = () => {
	uni.navigateTo({
		url: '../purchase/purchase',
	})
}
</script>

<style scoped lang="scss">
.container {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	background: #f8f7f8;

	.top-area {
		width: 100vw;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;


		.Img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 1px solid grey;

			img {
				width: 100%;
				border-radius: 50%;

			}
		}

		.name {
			min-width: 300rpx;
			display: flex;
			font-size: 36rpx;
			margin-left: 16rpx;
			// display: flex;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid grey;
		}

		.editBtn {
			width: 200rpx;
			height: 50rpx;
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			color: 0099CC;
			border-bottom: 1px solid grey;
		}
	}

	.card-area {
		margin-top: 11rpx;
		width: 93vw;
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 6px;
		box-shadow: 3px 3px #CCCCCC;
		display: flex;
		justify-content: center;
		border: 1px solid grey;

		:nth-child(n) {
			width: 33%;
			// display: inline-block;

		}

		.card {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			height: 89%;

			i {
				font-size: 36px;
			}
		}
	}

	.nav-card-area {
		width: 93vw;
		margin-top: 11px;
		border-radius: 6px;
		box-shadow: 3px 3px #CCCCCC;
		border: 1px solid grey;

		// :nth-child(n) {
		// 	// margin-top: 21rpx;
		// 	// margin-left: -20rpx;
		// 	width: 100%;
		// 	background: #FFFFFF;
		// 	font-size: 30rpx;
		// }

		// .list {
		// 	margin-top: 21rpx;
		// }
	}

}
</style>



<script>
export default {
	data() {
		return {

		}
	},
	methods: {

	}
}
</script>

<style></style>
