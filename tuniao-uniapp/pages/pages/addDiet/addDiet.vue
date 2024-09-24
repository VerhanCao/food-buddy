<template>
	<view class="classify">
		<!-- 搜索框 -->

		<view class="search">
			<view class="search-content" @click="goToSearch">
				<!-- 在uni-app官网找的图标 -->
				<uni-icons type="search" size="26" color="#9F9F9F"></uni-icons>
				<text>请输入食品名称</text>
			</view>
		</view>
		<!-- 分类部分 -->
		<view class="cate-container">

			<view class="cate-left">
				<view :class="['cate-item',activeIndex==index?'active':'']" v-for="(item,index) in cateList"
					:key="index" @click="changeActive(index, item)">{{item}}</view>
			</view>
			<view class="cate-right">
				<view class="cate-content" v-for="(goodItem,goodIndex) in goodList" :key="goodIndex"
					@click="addDiet(goodItem)">
					<image :src="goodItem.img" mode=""></image>
					<view class="cate-text" style="font-size: 25rpx;">{{goodItem.name}}</view>
				</view>
			</view>
		</view>

		<view class="footer" style="display: flex; justify-content: space-between; align-items: center;">
			<view style="display: flex; justify-content: start; align-items: center;">
				<uni-badge class="uni-badge-left-margin" style="margin-left: 20rpx;" :text="dietList.length"
					absolute="rightTop" size="small">
					<img src="../../static/food/canpan.png" style="width: 80rpx; height: 80rpx;" />
				</uni-badge>
				<view v-if="!showPopup" @click="showPopup = true" style="margin-top: 10rpx; margin-left: 10rpx;">
					<view>展开</view><uni-icons type="up" size="30"></uni-icons>
				</view>
				<view v-else-if="showPopup" @click="showPopup = false" style="margin-top: 10rpx; margin-left: 10rpx; ">
					<view>收起</view><uni-icons type="down" size="30"></uni-icons>
				</view>
			</view>
			<button type="primary" style="width: 12prpx; margin-right: 20rpx;" @click="add">完成</button>
		</view>

		<TnPopup v-model="showPopup" open-direction="bottom" width="100%" height="600rpx">
			<view class="cate-container">
				<view class="cate-left">
					<view :class="['cate-item',activeIndex1==index?'active':'']" v-for="(item,index) in cateList1"
						:key="index" @click="changeActive1(index,item)">{{item}}</view>
				</view>
				<view class="right" style="dispaly: flex; flex-direction: column;">
					<view style="margin-left: 6rpx;">共{{ dietList.length }}条记录,总计--千卡</view>
					<view class="content" v-for="(dietItem,dietIndex) in dietList" :key="dietIndex"
						@click="addDiet(dietItem)"
						style="width: 91%; display: flex; margin-left: 30rpx; border-bottom: 3rpx solid #CCCCCC; margin-top: 3rpx;">
						<image :src="dietItem.img" style="width: 60rpx; height: 60rpx;" mode=""></image>
						<view class="text" style="margin-left: 12rpx; width: 100rpx;">
							<view class="cate-text" style="font-size: 28rpx;">{{dietItem.name}}</view>
							<view style="font-size: 18rpx; color: #CCCCCC;">2千卡 每克</view>
						</view>
						<view class="btn">
							<uni-icons type="compose" size="27" style="margin-left: 230rpx;"
								@click="addWeight(dietIndex, dietItem.many)"></uni-icons>
							<uni-icons type="trash" size="27" style="margin-left: 20rpx;"></uni-icons>
						</view>
					</view>
					<view v-if="dietList.length === 0" class="content"
						style="width: 300rpx; height: 300rpx; margin-left: 100rpx; margin-top: 100rpx; padding: 50rpx;">
						<TnEmpty mode="list" />
					</view>
				</view>
			</view>
		</TnPopup>

		<TnModal ref="modalRef" />

		<TnPopup v-model="showPopup1" width="80%" height="250">
			<view
				style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
				<TnForm  size="lg">
					<TnFormItem label="请填写份量">
						<TnNumberBox v-model="weight1" />
						<TnButton text @click="saveWeight">保存</TnButton>
					</TnFormItem>
					<view class="btn">
						
					</view>
				</TnForm>
			</view>
		</TnPopup>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, ref, reactive } from 'vue'

	import request from '../../utils/request'
	// import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
	import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
	import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
	import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
	import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
	import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp/components/modal'
	import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
	import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
	import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'

	import { onLoad } from '@dcloudio/uni-app';
	let date = ref('')
	let weight1 = ref<number>(0)
	let index = 0
	let style = ref('')
	let cateList = ref(['谷类', '肉蛋奶', '蔬果'])
	// 当前点击项的索引号
	let activeIndex = ref(0)
	// 分类下的商品信息
	let goodList = ref([])
	let sort = ref('谷类')

	type dietType = {
		name: string,
		img: string,
		many: number,
		userId: number,
		style: string
	}
	// 用户记录的饮食
	let dietList = ref<dietType[]>([])
	const showPopup = ref(false)
	let showPopup1 = ref(false)
	let activeIndex1 = ref(0)
	let cateList1 = ref(['早餐', '中餐', '晚餐', '副食', '运动'])
	// const getcateList =  async() => {
	// 	let res=await uni.http.get('/classify')
	// 	console.log(res)
	// 	const {data:{classify,code}}=res
	// 	if(code!=200){
	// 		return uni.showToast({
	// 			title:'加载数据失败',
	// 			duration:1000,
	// 			icon:'none'
	// 		})
	// 	}else{
	// 		this.cateList=classify
	// 		// 获取第一个分类下的商品
	// 		this.goodList=classify[0].children
	// 	}
	// }
	const modalRef = ref<TnModalInstance>()

	const addDiet = (diet) => {
		if (dietList.value.indexOf(diet) === -1) {
			dietList.value.push(diet)
		}
	}
	
	const addWeight = (i: number, weight: number) => {
		console.log('diets: ' +dietList.value)
		console.log('i: ' +i)
		console.log('weight: ' +weight)
		weight1.value = weight
		index = i
		showPopup1.value = true
	}
	
	const saveWeight = () => {
		dietList.value[index].many = weight1.value
		showPopup1.value = false
	}



	const openModel = () => {
		modalRef.value?.showModal({
			title: '提示',
			content: '当前记录中仍有饮食未填写份量，可能会导致分析不准确，是否继续？',
			showCancel: true,
			confirmText: '去填写',
			cancelText: '继续',
			confirm: () => {
				showPopup.value = true
			},
			cancel() {

			}
		})
	}

	const add = () => {
		let diets = dietList.value.filter((diet) => { return diet.many === 0 })
		console.log('diets: ' +diets)
		if (diets.length > 0) {
			openModel()
		}
		else {
			for(let index=0; index<dietList.value.length; index++) {
				dietList.value[index].style = style.value
				dietList.value[index].userId = 1
			}
			request.post('/record', dietList.value).then(res => {
				if(res.code === 1) {
					dietList.value = []
				}
			})
		}
	}
	
	const queryDiets = () => {
		request.get('/queryDiets', { params: { sort: sort.value } }).then(res => {
			if (res.code === 1) {
				goodList.value = res.data
			}
		})
	}

	//更改点击项的索引号
	const changeActive = (i, diet: string) => {
		activeIndex.value = i
		// 已经获取到索引号
		sort.value = diet
		queryDiets()
	}

	const changeActive1 = (i, cate) => {
		activeIndex1.value = i
		// 已经获取到索引号
		if (cate != '早餐') {
			dietList.value = []
		}
	}

	const goToSearch = () => {
		uni.navigateTo({
			url: '../search/search'
		})
	}



	const getDate = () : string => {


		// 获取当前日期对象
		let currentDate = new Date();

		// 获取月份，注意：JavaScript中的月份是从0开始的，所以实际月份需要加1
		let month = currentDate.getMonth() + 1;

		// 获取日期
		let day = currentDate.getDate();

		// 因为月份和日期可能不够两位数，所以进行格式化
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;

		// 拼接成完整的日期字符串，如"06月08日"
		let formattedDate = month + '月' + day + '日';

		// 输出当前日期
		console.log(formattedDate);
		// 如果在网页中使用，可以将其赋值给一个，如：
		// document.getElementById('date').innerText = formattedDate;
		return (formattedDate)
	}

	onLoad((option) => {
		uni.setNavigationBarTitle({
			title: `${getDate() + option.style}`
		})
		style.value = option.style
		queryDiets()
	})

	onMounted(() => {
		date.value = getDate()
	})
</script>



<style scoped lang="scss">
	.classify {
		background-color: #fff;

		.search {
			width: 100%;
			height: 136rpx;
			display: flex;
			align-items: center;

			.search-content {
				width: 90%;
				height: 80rpx;
				margin: auto;
				border: 1px solid #E6E6E6;
				border-radius: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #9F9F9F;

				text {
					margin-left: 10rpx;
				}
			}
		}

		.cate-container {
			width: 100%;
			display: flex;

			.cate-left {
				width: 200rpx;
				height: calc(100vh - 136rpx);
				background-color: #F6F6F6;

				.cate-item {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					padding-left: 40rpx;
					box-sizing: border-box;
				}

				.active {
					background-color: #FFFFFF;
					position: relative;
					padding-left: 40rpx;
					box-sizing: border-box;

					&::before {
						content: '';
						display: block;
						width: 10rpx;
						border-radius: 6rpx;
						height: 40rpx;
						background-color: #1ebe8e;
						position: absolute;
						left: 0rpx;
						top: 30rpx;
					}
				}
			}

			.cate-right {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				height: 300rpx;

				.cate-content {
					width: 33%;
					height: 200rpx;
					text-align: center;

					image {
						width: 100rpx;
						height: 100rpx;
					}

					.cate-text {
						font-size: 34rpx;
					}
				}
			}
		}

		.footer {
			width: 100vw;
			height: 135rpx;
			background-color: #FFFFFF;

			border: 1rpx solid #CCCCCC;
			z-index: 100;
			position: fixed;
			bottom: 0;

		}
	}
</style>