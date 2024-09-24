<!--
 * @description: 抽离开源版本
 * @Author: chuyinlong
 * @Date: 2021-08-12 15:36:21
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-08-30 14:21:38
 * 123
-->
<template>
	<view>
		<view class="left__biggoods-page" v-if="loading">
			<view v-for="(item, index) in dataList" :key="index" class="con__box">
				<view class="i__title">{{ item.title }}</view>
				<left-secondgoods
					v-if="formData"
					:propData="formData"
					:dataList.sync="item.list"
				></left-secondgoods>
			</view>
		</view>
		<view
			v-else
			style="width:100%;height:100%;display:flex;justify-content:center;align-item:center"
		>
			<van-loading></van-loading>
		</view>
	</view>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import leftSecondgoods from '../left-second-goods/leftSecondGoods.vue'
import { getEffectCategoryGoods } from '@/api/modules/goods'
import { BusinessSuper } from '../../mallType'
import {
	LeftBigState,
	ApiClassifyGoodItem,
	ApiClassifyProduct
} from './leftBigType'
@Component({
	components: {
		leftSecondgoods
	}
})
export default class LeftBigGoods extends Vue implements LeftBigState {
	@Prop()
	propData!: BusinessSuper
	formData = {} as BusinessSuper
	dataList: Array<ApiClassifyGoodItem> = []
	showCategoryId: string = ''
	loading: boolean = true
	isFirst: boolean = true
	@Watch('propData')
	propDataChange(newValue: any) {
		this.propData = newValue
		this.setFromData(this.propData)
	}
	created() {
		this.setFromData(this.propData)
		// 第一次加载时默认显示全部tab
		this.isFirst = true
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 设置数据至组件
	 * @param {BusinessSuper} newValue
	 * @returns {*}
	 */
	setFromData(newValue: BusinessSuper): void {
		if (newValue) {
			this.loading = false
			uni.showLoading({
				title: '',
				mask: true
			})
			if (!newValue.firstCatList.length) return
			const showCategoryId = this.isFirst
				? newValue.firstCatList[0].category.id
				: newValue.currentFirstCategory.category.id
			newValue.currentFirstCategory = this.isFirst
				? newValue.firstCatList[0]
				: newValue.currentFirstCategory
			this.formData = newValue
			this.showCategoryId = showCategoryId
			this.getAllList()
		}
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 获取商品
	 * @param {*}
	 * @returns {*}
	 */

	async getAllList(): Promise<void> {
		const dataList: ApiClassifyGoodItem[] = []
		const param = {
			saleMode: this.$STORE.setStore.saleMode
		}

		const res = await getEffectCategoryGoods(this.showCategoryId, param)
		this.$emit('getNoList', res.length ? 1 : 0)
		if (res.length === 0) {
			this.loading = true
			uni.hideLoading()
			return
		}

		res.forEach(
			(sd: { name: string; apiAliveProductVos: Array<ApiClassifyProduct> }) => {
				dataList.push({
					title: sd.name,
					list: sd.apiAliveProductVos
				})
			}
		)
		this.dataList = dataList
		this.loading = true
		uni.hideLoading()
		this.isFirst = false
	}
}
</script>
<style lang="scss" scoped>
.left__biggoods-page {
	.i__title {
		box-sizing: border-box;
		color: #999999;
		background-color: #ffffff;
		padding-top: 40rpx;
		font-size: 24rpx;
	}

	.spellpre__goodsB--icon {
		height: 260rpx;

		.ipic {
			height: 260rpx;
			border-radius: 16rpx;
		}
	}

	.spellpre__goodsL--icon {
		height: 180rpx;
		width: 180rpx;

		.ipic {
			height: 180rpx;
			width: 180rpx;
			border-radius: 16rpx;
		}
	}

	.spellpre__goodsL--info {
		overflow-x: hidden;
	}

	.spellpre__goodsL--name {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
