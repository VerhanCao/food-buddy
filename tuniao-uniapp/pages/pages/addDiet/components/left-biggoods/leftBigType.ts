/*
 * @description:
 * @Author: vikingShip
 * @Date: 2021-08-10 13:16:51
 * @LastEditors: chuyinlong
 * @LastEditTime: 2021-08-20 10:57:06
 */
import { IProductList } from '../../../home/components/goods-ponents/goodsType'
import { BusinessSuper, FirstCategory } from '../../mallType'
/**
 * @LastEditors: vikingShip
 * @description: leftbiggoods的state
 * @param formData 父级传参
 * @param dataList 分类对应商品数组
 * @param showCategoryId 分类id
 * @param loading loading显隐标识
 */
export interface LeftBigState {
	formData: BusinessSuper
	dataList: Array<ApiClassifyGoodItem>
	showCategoryId: string
	loading: boolean
	isFirst: boolean
}
/**
 * @LastEditors: vikingShip
 * @description: 商品分类对应商品
 * @param name 分类名称
 * @param apiAliveProductVos 商品查询返回信息
 */
export interface ApiClassifyGoodItem {
	id?: number
	title: string
	list: Array<ApiClassifyProduct>
}

/**
 * @LastEditors: vikingShip
 * @description: 商品分类下商品字段
 * @param albumPics 画册图片，连产品图片限制为6张，以逗号分割
 * @param limitType 规格类型
 * @param maxPrice 最大价格
 * @param minPrice 最小价格
 * @param name 商品名称
 * @param pic 展示图片
 * @param productSn 货号
 * @param saleMode 销售专区
 * @param widePic 宽屏展示图片
 */
export interface ApiClassifyProduct extends IProductList {
	albumPics?: string
	id: number
	limitType?: number
	maxPrice?: number
	minPrice?: number
	name: string
	pic?: string
	saleMode?: number | string
	widePic?: string
	firstCatList?: Array<FirstCategory>
	hasTimeTips?: boolean
	goodTime?: string
	img?: string
	sale?: string
	price?: string | number
	soldCount?: string
	total?: number
	deliveryTime?: string
}
