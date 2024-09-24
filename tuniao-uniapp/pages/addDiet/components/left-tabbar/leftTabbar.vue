<!--
 * @description: 抽离开源版本
 * @Author: chuyinlong
 * @Date: 2021-08-12 15:36:21
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-08-30 14:22:14
-->
<template>
	<view>
		<scroll-view
			class="left__mode-page"
			scroll-y="true"
			:scroll-top="scrollTop"
			:style="styleType.style2"
		>
			<view
				v-for="(item, index) in getHeadList"
				:key="index"
				class="tab__item"
				:style="item.id === activeId ? styleType.style1 : styleType.style2"
				@tap="changeActiveItem"
				:data-item="item"
			>
				<text
					:style="
						item.id === activeId
							? 'background-color: #FC425A'
							: styleType.style2
					"
				></text>
				{{ item.name }}
			</view>
		</scroll-view>
	</view>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { BusinessSuper, FirstCategory } from '../../mallType'
@Component
export default class LeftTabbar extends Vue {
	@Prop()
	propData!: BusinessSuper
	@Prop()
	canClick!: boolean

	activeId = ''
	getHeadList: Array<{ id: string; name: string }> = []
	formData = {} as BusinessSuper
	styleType = {
		style1: '',
		style2: ''
	}
	scrollTop = 0
	isFirst = true

	created() {
		this.setPropData(this.propData)
	}

	@Watch('propData', { deep: true })
	propChange() {
		this.setPropData(this.propData)
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 设置数据至组件
	 * @param {BusinessSuper} newValue
	 * @returns {*}
	 */
	setPropData(newValue: BusinessSuper): void {
		if (newValue && newValue !== null) {
			this.formData = { ...newValue }
			this.getHeadListHandle()
			this.styleTypeHandle()
		}
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 获取tabList
	 * @param {*}
	 * @returns {*}
	 */

	getHeadListHandle(): void {
		const currentFirstCategory = this.formData
			.currentFirstCategory as FirstCategory
		let activeId = currentFirstCategory ? currentFirstCategory.category.id : ''
		const getHeadList = this.formData.firstCatList.map((i, d) => {
			if (d === 0 && this.isFirst) activeId = i.category.id
			return {
				id: i.category.id,
				name: (i.category.name || '').substr(0, 4)
			}
		})
		let scrollTop = this.scrollTop
		const index = getHeadList.findIndex((i) => i.id === activeId)
		if (index > 10) {
			scrollTop = (index - 10) * 50
		} else {
			scrollTop = 0
		}
		this.activeId = activeId
		this.getHeadList = getHeadList
		this.scrollTop = scrollTop
		this.isFirst = false
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 修改当前激活tab
	 * @param {string} e.currentTarget.dataset.item.id
	 * @returns {*}
	 */

	changeActiveItem(e: {
		currentTarget: { dataset: { item: { id: string; name: string } } }
	}): void {
		const item = e.currentTarget.dataset.item
		this.activeId = item.id
		this.$emit('changeCategoryId', item.id, {})
	}
	/**
	 * @LastEditors: chuyinlong
	 * @description: 设置样式至组件
	 * @param {*}
	 * @returns {*}
	 */

	styleTypeHandle(): void {
		if (!this.formData) return
		const { fontColor, fontBg, fontNotColor, fontNotBg } = this.formData
		const style1 = `color: ${fontColor}; background-color: ${fontBg}`
		const style2 = `color: ${fontNotColor}; background-color: ${fontNotBg}`
		this.styleType = {
			style1,
			style2
		}
	}
}
</script>
<style lang="scss" scoped>
.left__mode-page {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: rgba(242, 242, 242, 1);

	.tab__item {
		display: block;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		color: #333;
		background-color: rgba(242, 242, 242, 1);
		cursor: pointer;
		user-select: none;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		text-align: center;

		text {
			width: 8rpx;
			height: 30rpx;
			background-color: rgba(242, 242, 242, 1);
			top: 34rpx;
			position: absolute;
			left: 0;
		}
	}

	.tab__active {
		background-color: #fff;

		text {
			background-color: rgba(252, 66, 90, 1);
		}
	}
}
</style>
