<template>
	<view class="diet-content">
		<view class="record-content">
			<div class="tag">经典均衡饮食</div>
			<div class="showNumber">
				<div style="display: flex; flex-direction: column; align-items: center;">
					<text style="color: #acb3bf; font-size: 36rpx;">碳水化合物</text>
					<text
						style="font-size: 36rpx; font-weight: 600; color: #343d54;">{{ state.eat.carbohydrates }}克</text>
				</div>
				<TnCircleProgress :percent="canEat" active-color="#00bf70"
					style="margin-left: 60rpx; margin-right: 60rpx;">
					<view style="display: flex; flex-direction: column; align-items: center; ">
						<text style="color: #acb3bf;">还可吃<TnTag type="primary">推荐</TnTag></text>
						<text style="font-size: 36rpx; font-weight: 600; color: #343d54;">{{ total - eat }}Kcal</text>
					</view>
				</TnCircleProgress>
				<div style="display: flex; flex-direction: column; align-items: center;">
					<text style="color: #acb3bf; font-size: 36rpx;">蛋白质</text>
					<text style="font-size: 36rpx; font-weight: 600; color: #343d54;">{{ state.eat.protein }}克</text>
				</div>
			</div>
			<div style="width: 100%; display: flex; justify-content: space-between;">
				<view style="display: flex; margin-left: 30rpx;">
					<text style="font-size: 36rpx;">脂肪</text>
					<text style="font-size: 36rpx; font-weight: 600; margin-left: 18rpx;">{{ state.eat.fat }}克</text>
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
	}
</style>