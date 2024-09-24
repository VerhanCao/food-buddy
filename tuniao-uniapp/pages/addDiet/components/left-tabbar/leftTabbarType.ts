/*
 * @description: 
 * @Author: vikingShip
 * @Date: 2021-08-10 11:29:19
 * @LastEditors: vikingShip
 * @LastEditTime: 2021-08-10 11:33:35
 */
import { BusinessSuper } from "../../mallType"
/**
 * @LastEditors: vikingShip
 * @description: lefttabbar组件state
 * @param activeId 选中id
 * @param getHeadList 头部列表
 * @param formData 父组件参数
 * @param styleType 样式类型
 * @param scrollTop 上拉距离
 */
export interface LeftTabbarType {
    activeId: string
    getHeadList: Array<{id:string,name:string}>
    formData: BusinessSuper
    styleType: {
        style1: string,
        style2: string
    }
    scrollTop: number
    isFirst: boolean
}