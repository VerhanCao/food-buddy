<!--
 * @description: 抽离开源版本
 * @Author: chuyinlong
 * @Date: 2021-08-12 15:36:21
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-09-01 16:01:38
 * 123
-->
<template>
	<view class="top__mode-page">
		<view
			v-for="(item, index) in HeadList"
			:key="index"
			class="tab__item"
			:style="item.id === activeId ? styleType.style1 : styleType.style2"
			@tap="changeActiveItem"
			:data-item="item"
		>
			{{ item.name }}
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { BusinessSuper, FirstCategory } from '../../mallType'
@Component({})
export default class TopModehead extends Vue {
	@Prop() propData!: BusinessSuper
	formData = {} as BusinessSuper
	activeId: string = '-1'
	HeadList: Array<{ id: string; name: string }> = []
	styleType = {
		style1: '',
		style2: ''
	}
	isFirst: boolean = true

	@Watch('propData', {
		deep: true
	})
	getFormData() {
		this.formData = this.propData
		this.getHeadList()
		this.getstyleType()
	}

	created() {
		this.isFirst = true
	}

	mounted() {
		this.formData = this.propData
		this.getHeadList()
		this.getstyleType()
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 获取tabList
	 * @param {*}
	 * @returns {*}
	 */

	getHeadList(): void {
		const currentFirstCategory: Partial<FirstCategory> = this.formData
			.currentFirstCategory
		const curId = currentFirstCategory.category
			? currentFirstCategory.category.id
			: '-1'
		const activeId = this.isFirst ? '-1' : curId
		const list = this.formData.firstCatList.map((i) => {
			return {
				id: i.category.id,
				name: i.category.name
			}
		})
		this.setData(
			{
				activeId,
				HeadList: [
					{
						id: '-1',
						name: '全部'
					},
					...list
				]
			},
			() => {
				this.isFirst = false
			}
		)
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 修改当前激活tab
	 * @param {string} e.currentTarget.dataset.item.id
	 * @param {string} e.currentTarget.dataset.item.name
	 * @returns {*}
	 */

	changeActiveItem(e: {
		currentTarget: { dataset: { item: { id: string; name: string } } }
	}): void {
		const item = e.currentTarget.dataset.item
		this.formData.firstCatList.forEach((i) => {
			i.isSelected = i.category.id === item.id
		})
		this.setData({
			activeId: item.id
		})
		this.$emit('changeCategoryId', item.id)
	}

	/**
	 * @LastEditors: chuyinlong
	 * @description: 设置当前样式
	 */
	getstyleType() {
		const { fontColor, fontBg, fontNotColor, fontNotBg } = this.formData
		const style1 = `color: ${fontColor}; background-color: ${fontBg}`
		const style2 = `color: ${fontNotColor}; background-color: ${fontNotBg}`
		this.setData({
			styleType: {
				style1,
				style2
			}
		})
	}
}
</script>

<style lang="scss" scoped>
.top__mode-page {
	width: 100%;
	height: 50px;
	overflow-x: scroll;
	white-space: nowrap;
	box-sizing: border-box;
	padding: 0px 5px;
	background-color: #fff;

	.tab__item {
		display: inline-block;
		padding: 6px 16px;
		border-radius: 40px;
		font-size: 15px;
		color: #333;
		background-color: #fff;
		cursor: pointer;
		user-select: none;
		margin-top: 10px;
	}

	.tab__active {
		background-color: rgba(253, 78, 100, 1);
		color: #fff;
	}
}
</style>
