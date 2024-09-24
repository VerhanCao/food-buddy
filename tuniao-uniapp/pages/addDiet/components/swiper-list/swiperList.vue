<!--
 * @description: 抽离开源版本
 * @Author: chuyinlong
 * @Date: 2021-08-12 15:36:21
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-08-30 14:23:10
 * 123
-->
<template>
	<view class="swiper__list-page" v-if="dataList.length">
		<swiper
			class="homeSwiper-swiper"
			:indicator-dots="true"
			indicator-color="#fff"
			:autoplay="true"
			:circular="false"
			:vertical="false"
			:interval="3000"
			:duration="500"
			:previous-margin="0 + 'px'"
			:next-margin="0 + 'px'"
			style="height: 220rpx;"
		>
			<block v-for="(item, index) in dataList" :key="index">
				<swiper-item
					class="homeSwiper-swiper__item"
					@tap.stop="handleTap"
					:data-index="index"
				>
					<view
						class="homeSwiper-swiper__image"
						:style="'padding: 4rpx ' + padding * 2 + 'rpx'"
					>
						<image
							class="homeSwiper-swiper--angle2 homeSwiper-swiper__angle"
							:src="item.img"
							mode="aspectFill"
							lazy-load="true"
						></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { BusinessSuper, SwiperListItem } from '../../mallType'
import { navtofun } from '@/utils/navtofun'
@Component
export default class SwiperList extends Vue {
	@Prop()
	propData!: BusinessSuper
	formData = {} as BusinessSuper
	dataList: Array<SwiperListItem> = []
	isFirst: boolean = true
	@Watch('propData')
	propDataChange() {
		this.setPropData(this.propData)
	}

	created() {
		// 第一次加载时默认显示全部tab
		this.isFirst = true
		this.setPropData(this.propData)
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 设置数据至组件
	 * @param {BusinessSuper} newValue
	 * @returns {*}
	 */
	setPropData(newValue: BusinessSuper): void {
		if (newValue) {
			this.dataList = []
			if (!newValue.firstCatList.length) return
			const dataList = this.isFirst
				? newValue.firstCatList[0].swiperList
				: newValue.currentFirstCategory.swiperList
			this.formData = newValue
			this.dataList = dataList
			this.isFirst = false
		}
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 跳转
	 * @param {number} e.currentTarget.dataset.index
	 * @returns {*}
	 */

	handleTap(e: { currentTarget: { dataset: { index: number } } }): void {
		const index: number = e.currentTarget.dataset.index
		const currentSwiperItem = this.dataList[index]
		const itemLink = currentSwiperItem.link
		navtofun(itemLink, this, 'poster')
	}
}
</script>
<style lang="scss" scoped>
.swiper__list-page {
	@include b(homeSwiper) {
		background-color: #ffffff;
		position: relative;
	}

	@include b(homeSwiper-swiper) {
		height: 100%;
		margin-bottom: 40rpx;

		@include e(item) {
			height: 100%;
		}

		@include e(image) {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-top: 4rpx;

			image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		@include m(angle1) {
			border-radius: 0rpx;
		}

		@include m(angle2) {
			border-radius: 20rpx;
		}

		@include e(boxNM) {
			box-shadow: none;
		}

		@include e(boxCP) {
			box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.2);
		}

		@include e(corners) {
			border-radius: 0px;
		}

		@include e(angle) {
			border-radius: 14rpx;
		}

		@include e(indicator) {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 20rpx;
			height: 40rpx;
			width: 100%;
			box-sizing: border-box;
		}

		@include e(icat1) {
			text {
				display: inline-block;
				width: 16rpx;
				height: 16rpx;
				background-color: #ebedf0;
				opacity: 0.3;
				margin-right: 12rpx;
				border-radius: 50%;
			}

			@include m(active) {
				opacity: 0.8 !important;
				background-color: #fff !important;
			}
		}

		@include e(icat2) {
			position: absolute;
			right: 0;
			bottom: 30rpx;
			display: block;

			text {
				float: right;
				box-sizing: border-box;
				padding: 10rpx 24rpx;
				background-color: rgba(0, 0, 0, 0.2);
				color: #fff;
				font-size: 26rpx;
				border-radius: 32rpx;
			}
		}

		@include e(icat3) {
			text {
				display: inline-block;
				width: 44rpx;
				height: 6rpx;
				background-color: #ebedf0;
				opacity: 0.3;
				margin-right: 12rpx;
				border-radius: 8rpx;
			}

			@include m(active) {
				opacity: 0.8 !important;
				background-color: #fff !important;
			}
		}
	}

	@include b(contact-style) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
