/*
 * @description:
 * @Author: vikingShip
 * @Date: 2021-08-10 10:21:21
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-08-17 15:49:48
 */
import { BusinessSuper } from '../../mallType'
import { ApiClassifyProduct } from '../left-biggoods/leftBigType'
/**
 * @LastEditors: vikingShip
 * @description:
 * @param formData
 * @param getGoodsNameClass 商品名称文本样式
 * @param getGoodsBoxClass 商品边框样式
 * @param getBigGoodsPageClass 商品page样式
 * @param goodsList 商品列表
 * @param searchForm 获取商品时搜索对象
 * @param hasMore 是否还有更多
 */
export interface TopBigState {
	formData: TopFormDataType
	getGoodsNameClass: string
	getGoodsBoxClass: string
	getBigGoodsPageClass: string
	goodsList: Array<ApiClassifyProduct>
	searchForm: InterSearchForm
	hasMore: boolean
	isFirst: boolean
}

export interface MallGood {
	id: number
	name: string
	img: string
	actPrice: number
	price: number
	soldCount: number
	inventory: number
	hasTimeTips: string
}

export interface InterSearchForm {
	current: number
	name: string
	showCategoryId: string
	size: number
	saleMode: string
}

export interface TopFormDataType extends BusinessSuper {
	count: number
}
