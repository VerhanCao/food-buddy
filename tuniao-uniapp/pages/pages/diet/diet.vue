<template>

	<view class="diet-content">
		<view class="record-content">
			<div class="tag">经典均衡饮食</div>
			<div class="showNumber">
				<div style="display: flex; flex-direction: column; align-items: center;">
					<text style="color: #acb3bf; font-size: 36rpx;">碳水化合物</text>
					<text style="font-size: 52rpx; font-weight: 600; color: #343d54;">{{ state.eat.carbohydrates
						}}</text>
				</div>
				<TnCircleProgress :percent="canEat" active-color="#00bf70"
					style="margin-left: 60rpx; margin-right: 60rpx;">
					<view style="display: flex; flex-direction: column; align-items: center; ">
						<text style="color: #acb3bf;">还可吃<TnTag type="primary">推荐</TnTag></text>
						<text style="font-size: 52rpx; font-weight: 600; color: #343d54;">{{ total - eat }}</text>
					</view>
				</TnCircleProgress>
				<div style="display: flex; flex-direction: column; align-items: center;">
					<text style="color: #acb3bf; font-size: 36rpx;">蛋白质</text>
					<text style="font-size: 52rpx; font-weight: 600; color: #343d54;">{{ state.eat.protein }}</text>
				</div>
			</div>
			<div style="width: 100%; display: flex; justify-content: space-between;">
				<view style="display: flex; margin-left: 30rpx;">
					<text style="font-size: 36rpx;">脂肪</text>
					<text style="font-size: 36rpx; font-weight: 600; margin-left: 18rpx;">{{ state.eat.fat }}</text>
				</view>
				<view
					style="background-color: #b7f7f1; color: #1ebe8e; padding: 20rpx; font-size: 30rpx; border-radius: 10rpx 0 0 10rpx;  font-weight: 600;">
					<TnIcon name="fire-fill"></TnIcon>热量自动记录
				</view>
			</div>
		</view>
		<div class="content">
			<view
				style="box-shadow: inset 12rpx 12rpx 23rpx #bebebe, inset -12rpx -12rpx 23rpx #ffffff; border-radius: 6rpx;;">

				<TnTabs v-model="currentTabIndex" height="53rpx" bg-color="tn-grey-light_bg" font-size="23"
					bar-width="60" bar-color="tn-gray_bg">
					<TnTabsItem v-for="(item, index) in tabsData" :key="index" :title="item.text"
						@click="switchStyle(item.text)" />
				</TnTabs>
			</view>
			<div class="addBtn" style="width: 100%; margin-top: 10rpx;">
				<div style="float: right;">
					<TnButton type="success" text @click="addDiet">
						<TnIcon name="add-circle"></TnIcon>添加饮食记录
					</TnButton>
				</div>
			</div>
			<div class="box" v-if="datas.length === 0">
				<TnEmpty mode="data">
					<template #icon>
						<image src="../../static/饮食.png" style="width: 300rpx; height: 300rpx;"></image>
					</template>
					<template #tips>当前记录为空, 赶紧记录起来吧</template>
				</TnEmpty>
			</div>

			<div class="content" v-else>
				<view class="datas"
					style="width: 98%; background-color: #FFFFFF; border-radius: 15rpx; display: flex; flex-direction: column; justify-content: start; padding: 20rpx;">
					<view class="title"
						style="width: 98%; display: flex; justify-content: space-between; align-items: center; font-size: 30rpx; margin-left: 1%;">
						<text>{{ style }}</text>
						<text>--千卡 ></text>
					</view>
					<view v-for="(item, index) in diets" :key="index"
						style="width: 100%; display: flex; alin-items: center;">
						<view class="Img" style="width: 33%;">
							<image :src="item.img" style="width: 100rpx; height: 100rpx;"></image>
						</view>
						<view style="width: 33%;">
							<view class="name">{{ item.name }}</view>
							<view class="weight">x{{ item.many }}g</view>
						</view>
						<view>{{ item.energy }}</view>
					</view>

				</view>
				<view class="btns"
					style="width: 80vw; display: flex; justify-contnt: space-between; align-items: center; margin-top: 30rpx; padding: 10rpx;">
					<TnButton plain type="success" @click="dietAdvice()">饮食建议</TnButton>
					<TnButton plain :custom-style="{ marginLeft: '200rpx' }" @click="recommend()">今日菜品推荐</TnButton>
				</view>
			</div>

			<TnModal ref="modalRef" />
		</div>

		<view class="container">
			<TnTabs v-model="currentTabIndex" style="width: 100vw;" bar :scroll="false">
				<TnTabsItem v-for="(item, index) in tabsData" :key="index" :title="item.text"
					@change="tabChange(item.text)" />
			</TnTabs>
			<view class="diet-message">
				<!-- <h3>饮食监控</h3> -->
				<view class="energy-message">
					<view class="message">
						<text class="title">全天摄入</text>
						<text class="content"><text class="record-number">{{ state.normalNumber.day }}</text>Kcal</text>
					</view>
					<view class="message">
						<text class="title">理想摄入</text>
						<text class="content"><text class="record-number">{{ state.normalNumber.dreamed
								}}</text>Kcal</text>
					</view>
					<view class="message">
						<text class="title">运动消耗</text>
						<text class="content"><text class="record-number">{{ state.normalNumber.reducedBySport
								}}</text>Kcal</text>
					</view>
				</view>
				<view class="sort-message">
					<view class="message">
						<text class="title"><i class="iconfont icon-tanshuihuahewu"></i>碳水</text>
						<text class="content"><text class="record-number">{{ state.currentNumber.CH }}</text> / <text
								class="record-number">{{ state.totalNumber.CH }}</text>g</text>
					</view>
					<view class="message">
						<text class="title"><i class="iconfont icon-Sm-danbaizhi"></i>蛋白质</text>
						<text class="content"><text class="record-number">{{ state.currentNumber.EW }}</text> / <text
								class="record-number">{{ state.totalNumber.EW }}</text>g</text>
					</view>
					<view class="message">
						<text class="title"><i class="iconfont icon-zhifang"></i>脂肪</text>
						<text class="content"><text class="record-number">{{ state.currentNumber.FAT }}</text> / <text
								class="record-number">{{ state.totalNumber.FAT }}</text>g</text>
					</view>
				</view>
			</view>

			<view class="selectDietType">
				<nut-config-provider :theme-vars="themeVars">
					<nut-popup v-model:visible="pickVisible" position="bottom" style="border-radius: 6rpx;">
						<nut-picker v-model="selected" :columns="columns" title="饮食记录类型" @confirm="confirm"
							@cancel="pickVisible = false">
						</nut-picker>
					</nut-popup>
				</nut-config-provider>
			</view>
			<view class="record-title">
				<nut-divider dashed><i class="iconfont icon-icon3"></i>特别量监控</nut-divider>
			</view>
			<view v-if="false" class="record-content">
				<view class="area" v-for="(item, index) in state.foods" :key="index">
					<view class="title">
						<h3>{{ item[0].daysApart }}天前&nbsp;&nbsp;{{ item[0].sort }}</h3>
					</view>
					<view class="content">
						<view class="content-area" v-for="(Item, Index) in item" :key="Index">
							<img src="" width="30rpx" alt="一张食物图片">
							<text class="number"><text class="message">{{ Item.name }}</text><text class="message">{{
						Item.num
					}}</text></text>
						</view>
					</view>
					<view class="footer-area"></view>
				</view>
			</view>
			<nut-tab-pane title="无内容">
				<nut-empty image="empty" description="无内容"></nut-empty>
			</nut-tab-pane>

			<!-- 		<nut-button type="primary">主要按钮</nut-button> -->
			<!-- <view class="diet-record">
			<view class="record-message">
				<view class="record-title"><text>早餐</text></view>
				<span class="record-blank"></span>
				<view class="record-content">
					<nut-button plain><nut-icon size="small" name="plus"></nut-icon></nut-button>
					<nut-tag custom-color="#FF9900">牛肉包</nut-tag>
				</view>
			</view>
		</view> -->
			<nut-config-provider :theme-vars="themeVars">
				<nut-fixed-nav :position="{ top: '300px' }" type="right" v-model:visible="myActive">
					<template v-slot:list>
						<ul class="nut-fixed-nav__list">
							<li :class="{ 'nut-fixed-nav__list-item': true, 'active-click': state.activeChoose === 'history' }"
								@click="useNav('history')"><i class="iconfont icon-lishi"></i>历史记录</li>
							<li :class="{ 'nut-fixed-nav__list-item': true, 'active-click': state.activeChoose === 'upload' }"
								@click="useNav('upload')"><i class="iconfont icon-24gf-recordSquare"></i>记录饮食</li>
							<li :class="{ 'nut-fixed-nav__list-item': true, 'active-click': state.activeChoose === 'analysis' }"
								@click="useNav('analysis')"><i class="iconfont icon-fenxi"></i>分析饮食</li>
						</ul>
					</template>
					<template v-slot:btn>
						<nut-icon name="retweet" color="#ffffff" />
						<span class="text">{{ myActive? '展开': '收起' }}</span>
					</template>
				</nut-fixed-nav>
			</nut-config-provider>

		</view>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue'
import request from '../../utils/request'
import TnCircleProgress from '@tuniao/tnui-vue3-uniapp/components/circle-progress/src/circle-progress.vue'
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
// import TnLineProgress from '@tuniao/tnui-vue3-uniapp/components/line-progress/src/line-progress.vue'
import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp'

let total = ref(1800)
let eat = ref(600)
let canEat = ref(66)
let style = ref('早餐')
const currentTabIndex = ref(0)
let userId = ref(1)
let diets = ref([])
let datas = ref([])
let content = ref('')



const modalRef = ref<TnModalInstance>()


const state = reactive({
	eat: {
		carbohydrates: 0,
		protein: 0,
		fat: 0
	}
})

const tabsData = [
	{
		text: '早餐',
	},
	{
		text: '中餐',
	},
	{
		text: '晚餐',
	},
	{
		text: '副食',
	},
	{
		text: '运动'
	}
]

const addDiet = () => {
	uni.navigateTo({
		url: '../addDiet/addDiet?style=' + style.value
	});
}

const queryDiets = async () => {
	let res = await request.get('/queryDietMessage/' + userId.value)
	if (res.code === 1) {
		datas.value = res.data
		diets.value = datas.value.filter((item) => { return item.style === '早餐' })
		getData()
	}
}

const recommend = () => {
	request.get('/recommend', { params: { id: userId.value } }).then(res => {
		content.value = res.data ? res.data : '您当前的饮食习惯良好，请继续保持'
		modalRef.value?.showModal({
			title: '本日菜品推荐',
			content: content.value,
		})
	})
}

const dietAdvice = () => {
	let str = diets.value.map((item) => { return item.name + item.many + '克' }).toString()
	uni.navigateTo({
		url: `../analysis/analysis?style=${style.value}&id=${userId.value}&str=${str}`
	})
}

const switchStyle = (style1) => {
	style.value = style1
	diets.value = datas.value.filter((item) => { return item.style === style1 })
}

const getData = () => {
	// total.value = diets.value.reduce((prev, item) => {
	// 	prev += parseFloat(item.energy) / 100 * item.many
	// }, 0)
	for (let index = 0; index < datas.value.length; index++) {
		state.eat.protein += parseFloat(datas.value[index].protein.replace('克', '') / 100 * datas.value[index].many)
		state.eat.TS += parseFloat(datas.value[index].carbohydrates.replace('克', '') / 100 * datas.value[index].many)
		state.eat.fat += parseFloat(datas.value[index].fat.replace('克', '') / 100 * datas.value[index].many)
	}
	// state.eat.protein = diets.value.reduce((prev, item) => {
	// 	prev += parseFloat(item.protein.replace('克', '')) / 100 * item.many
	// }, 0)
	// state.eat.TS = diets.value.reduce((prev, item) => {
	// 	prev += parseFloat(item.carbohydrates.replace('克', '')) / 100 * item.many
	// }, 0)
	// state.eat.fat = diets.value.reduce((prev, item) => {
	// 	prev += parseFloat(item.fat.replace('克', '')) / 100 * item.many
	// }, 0)

}

onMounted(() => {
	queryDiets()
	// getData()
})
</script>

<style scoped lang="scss">
.diet-content {
	width: 100vw;
	height: 100vh;
	display: flex;

	flex-direction: column;
	justify-content: start;
	align-items: center;
	background-color: #f4f6fa;

	.record-content {
		width: 95vw;
		height: 500rpx;
		background-color: #FFFFFF;

		border-radius: 16rpx;
		// display: flex;
		margin-top: 20rpx;

		.tag {
			background-color: #ffecb7;
			color: #9a691f;
			border-radius: 0 6rpx 6rpx 0;
			width: 300rpx;
			height: 72rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
		}

		.showNumber {
			width: 92%;
			height: 300rpx;
			display: flex;

			justify-content: center;
			align-items: center;
		}
	}

	.content {
		width: 95vw;
		margin-top: 10rpx;
		display: flex;

		flex-direction: column;
		justify-content: start;
		align-items: center;

		.box {
			margin-top: 100rpx;
		}
	}


	import TnTabs from '@/uni_modules/tuniaoui-vue3/components/tabs/src/tabs.vue'
	import TnTabsItem from '@/uni_modules/tuniaoui-vue3/components/tabs/src/tabs-item.vue'

	import {
		reactive,
		ref
	}

	from 'vue';

	let myActive=ref(false) let pickVisible=ref<Boolean>(false) const state=reactive({
		normalNumber: {
			day: 100,
			dreamed: 100,
			reducedBySport: 100,
		}

		,

		totalNumber: {
			CH: 100,
			EW: 100,
			FAT: 100,
		}

		,

		currentNumber: {
			CH: 100,
			EW: 100,
			FAT: 100,
		}

		,

		activeChoose: 'history',

		foods: [ [ {
			daysApart: 2,
			sort: '早餐',
			name: '油条',
			img: '',
			num: 1,
			hot: 100,
		}

		,

		],

		[ {
			daysApart: 1,
			sort: '早餐',
			name: '面包',
			img: '',
			num: 1,
			hot: 100,
		}

		],

		[ {
			daysApart: 0,
			sort: '早餐',
			name: '牛奶',
			img: '',
			num: 1,
			hot: 100,
		}

		]]

	}) const currentTabIndex=ref(0) const tabsData=[ {
	text: '收藏',
}

,

{
text: '自定义',
}

,

{
text: '常用',
}

] let selected=ref(['0', 'breakfast']) const columns=ref([ [ {
		text: '今日', value: '0',
	}

	,

	{
	text: '近三日', value: '3',
}

,

{
text: '一周内', value: '7',
}

],

// 第二列
[ {
	text: '早餐', value: 'breakfast',
}

,

{
text: '中餐', value: 'lunch',
}

,

{
text: '晚餐', value: 'dinner',
}

,

{
text: '副食', value: 'branchFood',
}

,

{
text: '运动', value: 'sport',
}

],
]) const themeVars=reactive({
	primaryColor: '#59bcde',
	primaryColorEnd: '#59bcde'

}) const tabChange=(text : string)=> {
	console.log('当前选中text: ' + text);
}

const confirm=({
	selectedValue, selectedOptions

})=> {
	// selected.value = 
	// console.log('当前选中selected: ' +selectedOptions.map((val: any) =>  val.text).join(', '));
	console.log('selectedValue: ' + selectedValue);
	selected.value=selectedValue;
	pickVisible.value=false;
}

const useNav=(currentNav : string)=> {
	state.activeChoose=currentNav;
	console.log('当前选中nav: ' + currentNav);
	if (state.activeChoose==='history') pickVisible.value=true;
	myActive.value=false;
}

</script><style lang="scss" scoped>.container {
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #f2f3f5;

	.diet-message {
		width: 100%;
		height: 369rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #CCCCCC;

		h3 {
			color: #0099CC;
		}

		.energy-message {
			width: 89%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border: 1px solid grey;
			margin-top: 39rpx;
		}

		.sort-message {
			width: 92%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 29rpx;

			.message {
				border-radius: 6rpx;
				border: 1px solid #999999;
				margin-left: 19rpx;
			}

		}

		.message {
			width: 33%;
			height: 99rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 29rpx;

			.record-number {
				width: 69rpx;
				color: #999999;
				font-size: 39rpx;
			}
		}

	}

	.record-title {
		width: 100vw;
	}

	.record-content {


		.area {
			margin-top: 9px;
			width: 89%;
			margin-left: 9vw;

			.title {
				width: 100%;
			}

			.content {
				width: 100%;
				margin-top: 9px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.content-area {
					width: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 20rpx;


					.number {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}

	}

	.selectDietType {
		width: 100vw;
		height: 39rpx;
		position: fixed;
	}

	.diet-record {
		width: 100%;
		// height: calc(100vh - 421rpx);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.record-message {
			width: 89%;
			min-height: 100rpx;
			background: #FFFFFF;
			margin-top: 15rpx;
			display: flex;
			align-items: center;
			border-radius: 6rpx;
			// flex-wrap: nowrap;

			.record-title {
				width: auto;
				// box-shadow: 0 3rpx 3rpx 0 grey;
			}

			.record-blank {
				width: 39rpx;
				// height: 39rpx;
				height: 100rpx;
				border-left: 3rpx soild grey;

			}

			// height: auto;
			// box-shadow: 

			.record-content {
				width: 89%;
				display: flex;
				flex-wrap: wrap;

				:nth-child(n) {
					margin-left: 6rpx;
					margin-top: 6rpx;
				}

				// overflow-x: scroll;
			}

		}
	}

	.nut-fixed-nav__list-item {
		font-size: 20rpx;
	}

	.active-click {
		font-size: 21rpx;
		color: #0099CC;
		box-shadow: 1px 1px grey;
	}

}
</style>