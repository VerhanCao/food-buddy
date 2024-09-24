<!--
 * @description: 
 * @Author: vikingShip
 * @Date: 2021-07-28 09:25:02
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-08-17 15:43:13
-->
<template>
	<view class="page">
		<view class="page__box  van-search">
			<view class="page__header  " @tap="toPop">
				<van-icon name="search" class="page__header__icon"></van-icon>
				请输入关键字搜索
			</view>
		</view>
	</view>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SearchPlugin extends Vue {
	name: string = 'mall'

	/**
	 * @LastEditors: chuyinlong
	 * @description: 跳转搜索二级页面
	 * @param {*}
	 * @returns {*}
	 */

	toPop(): void {
		uni.navigateTo({
			url: '/subcontract/pages/Search/Search?chanel=2'
		})
	}
}
</script>
<style lang="scss" scoped>
.page__header {
	border-radius: 80rpx;
	height: 80rpx;
	display: inline-block;
	display: -webkit-box;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	background-color: #f8f8f8;
	font-size: 28rpx;
	width: 100%;
}
.page__header__icon {
	font-size: 28rpx;
	margin: 0 40rpx;
}
.page__box {
	background: #fff;
	height: 120rpx;
	width: 100%;
	padding: 10rpx 20rpx;
}
.page .page__pop--search {
	color: #fff;
	font-weight: 800;
	margin-right: 20rpx;
	background: #fe5468;
	padding: 0 40rpx;
	border-radius: 40rpx;
}
.page .page__item {
	width: 33%;
	padding: 14rpx 20rpx;
	float: left;
	text-align: center;
}
.page .page__item--word {
	display: block;
	width: 80%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	border-radius: 40rpx;
	background: #f5f5f5;
	font-size: 28rpx;
	padding: 20rpx 20rpx;
	text-align: center;
}
</style>
