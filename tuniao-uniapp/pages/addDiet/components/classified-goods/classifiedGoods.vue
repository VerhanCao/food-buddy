<!--
 * @description: 抽离开源版本
 * @Author: chuyinlong
 * @Date: 2021-08-12 15:36:21
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-09-01 16:01:31
 * 123
-->
<template>
	<view class="classified__goods-page">
		<view v-for="(nav, index) in navigation" :key="index">
			<block v-if="nav.name">
				<view
					class="navi__box1"
					v-if="
						formData.currentFirstCategory.navigationStyle === 1 &&
							(navigation.length > 1 ||
								(navigation.length === 1 && nav.navType !== 1))
					"
				>
					<text class="nav_b"></text>
					<text class="nav_p">{{ nav.name }}</text>
					<text class="nav_b"></text>
				</view>
				<view
					class="navi__box2"
					v-if="
						formData.currentFirstCategory.navigationStyle === 2 &&
							(navigation.length > 1 ||
								(navigation.length === 1 && nav.navType !== 1))
					"
				>
					<text class="nav_b2"></text>
					<text class="nav_p2">{{ nav.name }}</text>
				</view>
				<view
					v-for="(item, idx) in nav.chartList"
					:key="idx"
					:class="'class-item ' + (idx % 3 === 0 ? 'remove__margin' : '')"
					@tap="showSecondCategory"
					:data-item="item"
				>
					<image :src="item.img" mode="aspectFill" lazy-load="true"></image>
					<text class="item_p">{{ item.category.name }}</text>
				</view>
			</block>
		</view>
	</view>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Navigation, BusinessSuper, Chart } from '../../mallType'
@Component
export default class ClassifiedGoods extends Vue {
	@Prop()
	propData!: BusinessSuper
	formData: BusinessSuper = {} as BusinessSuper
	navigation: Array<Navigation> = []

	@Watch('propData')
	propDataChange() {
		this.setdata(this.propData)
	}

	created() {
		this.setdata(this.propData)
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description:
	 * @param {BusinessSuper} newValue
	 * @returns {*}
	 */
	setdata(newValue: BusinessSuper): void {
		const { currentFirstCategory } = newValue
		let { navigation } = currentFirstCategory
		if (navigation) {
			if (navigation.length > 1) {
				const temp = navigation.findIndex((i) => i.navType === 1)
				if (temp !== -1) {
					const list = [...navigation]
					list.push(...list.splice(temp, 1))
					navigation = [...list]
				}
			}
			this.formData = newValue
			this.navigation = navigation
		}
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 查看二级分类商品
	 * @param {Chart} e.currentTarget.dataset.item
	 * @returns {*}
	 */

	showSecondCategory(e: { currentTarget: { dataset: { item: Chart } } }): void {
		const data = e.currentTarget.dataset.item
		uni.navigateTo({
			url: `/subcontract/pages/spellPage/second-catgoods/second-catgoods?chanel=12&categoryId=${data.category.id}&cartButton=${this.formData.cartButton}`
		})
	}
}
</script>
<style lang="scss" scoped>
.classified__goods-page {
	width: 100%;
	box-sizing: border-box;

	.class-item {
		width: 142rpx;
		height: 222rpx;
		display: inline-block;
		margin-left: calc((100% - 430rpx) / 2);
		margin-bottom: 16rpx;
		vertical-align: top;

		image {
			display: block;
			width: 100%;
			height: 142rpx;
			border-radius: 6rpx;
		}

		.item_p {
			display: block;
			height: 80rpx;
			line-height: 80rpx;
			width: 100%;
			color: #333;
			text-align: center;
			font-size: 24rpx;
		}
	}

	.remove__margin {
		margin-left: 0px;
	}

	.navi__box1 {
		height: 100rpx;
		text-align: center;

		text {
			display: inline-block;
		}

		.nav_p {
			height: 100rpx;
			line-height: 80rpx;
			padding: 0 30rpx;
			vertical-align: middle;
			font-size: 24rpx;
		}

		.nav_b {
			width: 104rpx;
			height: 2rpx;
			background-color: rgba(236, 236, 236, 1);
			vertical-align: super;
		}
	}

	.navi__box2 {
		height: 100rpx;
		position: relative;

		.nav_b2 {
			height: 26rpx;
			left: 0;
			top: 28rpx;
			width: 4rpx;
			background-color: #333;
			position: absolute;
		}

		.nav_p2 {
			display: inline-block;
			height: 100rpx;
			line-height: 80rpx;
			padding-left: 30rpx;
		}
	}
}
</style>
