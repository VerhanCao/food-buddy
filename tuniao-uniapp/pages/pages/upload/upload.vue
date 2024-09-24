<template>
	<view class="container">
		<TnSearchBox v-model="searchValue" style="width: 89%;" placeholder="输入菜品关键字完成检索" @search="search()"
			:size="'sm'"></TnSearchBox>
		<tn-tabs style="width: 100vw;" v-model="current" height="100rpx" font-size="32" bar-width="60" :scroll="false">
			<tn-tabs-item style="width: 33%;" v-for="(item, index) in state.tabList" :key="index" :title="item.text"
				@click="current = index" />
		</tn-tabs>
		<view v-if="current === 0" class="usual">
			<view class="area-diet">
				<scroll-view scroll-y="true" class="scroll-Y">
					<checkbox-group>
						<label v-for="item in state.tableData" :key="item.id" class="diet-content">
							<view>
								<checkbox :value="item.id" :checked="item.flag" @click="choose(item)"></checkbox>
							</view>
							<view class="content">{{ item.name }}
								<view v-show="item.flag === true" style="font-size: 10px; margin-left: 8rpx; color: #CCCCCC;">
									当前分量
									<TnNumberBox v-model="item.many" :min="1"></TnNumberBox>
									g
								</view>
							</view>
						</label>
					</checkbox-group>
				</scroll-view>
			</view>
			<view class="acount">
				<view class="left">
					<TnBadge :value="`${selected.length}条`" type="primary" :bold="true">
						<TnIcon name="eat-other-fill"></TnIcon>
					</TnBadge>
				</view>
				<view class="right" style="height: 100%;">
					<TnButton text type="primary" @click="show()">展开所有<TnIcon name="down"></TnIcon>
					</TnButton>
				</view>
			</view>
		</view>


		<view v-else-if="current === 1" class="area">
			<view class="carousel">
				<TnSwiper v-model="currentIndex1" :data="Img" indicator indicator-type="line" autoplay>
					<template #default="{ data }">
						<view class="carousel-item">
							<image :src="data" mode="aspectFill" />
						</view>
					</template>
				</TnSwiper>
			</view>

			<view class="upload1" @click="visible = true">
				<TnIcon name="upload-simple" type="primary" size="100rpx"></TnIcon>
			</view>
		</view>

		<TnPopup v-model="visible">
			<view
				style="width: 300px; margin-top: 20px; min-height: 260px; display: flex; flex-direction: column; align-items: center;">
				<TnForm ref="formRef" :model="state.params" label-position="right" :rules="rules">
					<view class="form">
						<TnFormItem label="菜品名" prop="name">
							<TnInput v-model="state.params.name" :underline="true" />
						</TnFormItem>
						<TnFormItem label="份量" prop="many">
							<TnInput v-model="state.params.many" type="number" :underline="true" />
						</TnFormItem>
						<TnFormItem label="类型" prop="style">
							<TnInput v-model="state.params.style" type="select" :underline="true"
								@click="openPick = true" />
							<TnPicker v-model="state.params.style" v-model:open="openPick" :data="styles"></TnPicker>
						</TnFormItem>
						<view class="tn-mt tn-flex-center">
							<TnButton size="lg" type="primary" @click="submit"> 提交 </TnButton>
						</view>
					</view>
				</TnForm>
			</view>
		</TnPopup>

		<TnPopup v-model="open" open-direction="bottom" height="700">
			<view class="order">
				<view class="title">菜品篮子</view>
				<view class="content" style="height: 89vh;">
					<view style="width: 89vw; display: flex; align-items: center; color: #CCCCCC; font-size: 13px;">
						<view style="margin-left: 60px; width: 100px; ">名称</view>
						<view style="margin-left: 11px;">份量g</view>
					</view>
					<view class="diet-area" v-for="(item, index) in selected" :key="index">
						<view style="margin-left: 10px; font-size: 21px; color: #0099CC;">{{ index + 1 }}</view>
						<view
							style="width: 100px; margin-left: 11px; font-size: 20px; text-align: center; font-family: 'Microsoft YaHei';">
							{{ item.name }}
						</view>
						<view
							style="margin-left: 11px; font-size: 10px; color: #CCCCCC; width: 60px; text-align: center;">
							{{ item.many }}
						</view>
						<!-- <view class="btn" style="margin-left: 20px;"> -->
						<TnButton @click="showModal(item)">
							<TnIcon name="edit"></TnIcon>修改份量
						</TnButton>
						<TnIcon name="delete" type="danger" @click="remove(item)"></TnIcon>
						<!-- </view> -->
					</view>
					<view style="position: absolute; left: 0; top: 0;">
						<TnButton text type="primary" @click="record">上传</TnButton>
					</view>
				</view>
			</view>
		</TnPopup>

		<TnModal ref="modalRef">
			<view class="modal">
				<TnNumberBox v-model="many1" :min="1" :step="1"></TnNumberBox>
			</view>
		</TnModal>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
	import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
	import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
	import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
	import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
	import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
	import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
	import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp/components/modal'
	import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
	import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
	import TnSearchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'
	import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
	import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
	import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
	import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
	import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'

	// let modal1 = ref(false)
	// let arrId = []
	// let showBox = ref<Boolean>(false)
	let openPick = ref<Boolean>(false)
	let styles = ['早餐', '中餐', '晚餐', '副食', '运动']
	let visible = ref<Boolean>(false)
	let currentIndex1 = ref<number>(0)
	let open = ref<Boolean>(false)
	let many1 = ref<number>(1)
	let modalRef = ref<TnModalInstance>()
	let searchValue = ref<string>('')
	let current = ref<number>(0)
	const formRef = ref<TnFormInstance>()
	// 存放菜品id
	let selected = ref<dietType[]>([])
	type dietType = {
		id : number,
		name : string,
		CH : number,
		EW : number,
		FAT : number,
		rate : number,
		path : string,
		flag : Boolean,
		many : number,
	}

	const Img = [
		'../../static/carousel/1.jpg',
		'../../static/carousel/2.WEBP',
		'../../static/carousel/3.jpg'
	]

	const state = reactive({
		tabList: [
			{ text: '常用' },
			{ text: '自定义' },
			{ text: '收藏' }
		],
		tableData: [
			{ id: 1, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 },
			{ id: 2, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 },
			{ id: 3, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 },
			{ id: 4, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 },
			{ id: 5, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 },
			{ id: 6, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 },
			{ id: 7, name: '米饭', CH: 100, EW: 100, FAT: 100, rate: 5.0, path: '/static/diet/rice.jpg', flag: false, many: 1 }
		],

		arr1: [],

		params: {
			userId: 1,
			name: '',
			style: '早餐',
			many: '',
			note: '',
		}

	})

	const rules : FormRules = {
		name: [
			{ required: true, message: '菜品名不为空', trigger: 'blur' },
		],

		style: [
			{ required: true, message: '请选择一个类型', trigger: ['change', 'blur'] },
		],

		many: [
			{ required: true, message: '份量不为空', trigger: 'blur' },
		]
	}

	const submit = async () => {
		await formRef.value?.validate();
	}

	const search = () => {
		// 查询常用菜品

	}

	const choose = (diet : dietType) => {
		// console.log('val: ' +event.detail.value);
		// state.arr1 = [];
		// showBox.value = true;
		// selected.value = event.detail.value;
		// arrId = state.tableData.map(item => item.id);
		// console.log('ids: ' +arrId);
		// for(let index=0; index < selected.value.length; index++) {
		// 	console.log('currentId: ' +selected.value[index]);
		// 	console.log('arrId.indexOf(selected.value[index])' +arrId.indexOf(selected.value[index]))
		// }
		diet.flag = !diet.flag
		if (diet.flag)
			selected.value.push(diet);
		else
			selected.value.splice(selected.value.indexOf(diet), 1)
	}



	const show = () => {
		open.value = true;
	}

	const showModal = (diet : dietType) => {
		many1.value = diet.many
		modalRef.value?.showModal({
			title: '填选菜品份量',
			showCancel: true,
			confirmText: '确定',
			cancelText: '取消',
			cancel: () => {
				// console.log('点击了取消按钮')
			},
			confirm: () => {
				diet.many = many1.value;
				// console.log('点击了确认按钮')
				uni.showToast({
					title: '修改成功'
				})

			},
		})
	}

	const record = () => {
		// 上传dietArr
	}

	const remove = (diet : dietType) => {
		// filter1(id).flag = 0;
		diet.flag = false
		selected.value = selected.value.filter(item => item.id != diet.id)
		uni.showToast({
			title: '成功',
		});
	}




	// const getAssetURL = (img: string) => {
	// 	return new URL(`${img}`, import.meta.url).href;
	// }
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		.form {
			width: 200px;
			// height: 20px;
		}

		.usual {
			width: 100%;
			margin-top: 19px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;


			.area-diet {
				width: 89vw;
				display: flex;
				align-items: center;

				.diet-content {
					margin-top: 10px;
					display: flex;
					align-items: center;
					width: 100%;
					min-height: 39px;

					.content {
						margin-left: 6rpx;
						width: calc(100% - 69px);
						border-radius: 6rpx;
						border: 1px solid grey;
						min-height: 39px;
						font-size: 16px;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}


			.scroll-Y {
				max-height: 78vh;
			}

			.acount,
			.acount1 {
				border-top: 1px solid grey;
				width: 100vw;
				z-index: 10;
				position: absolute;
				bottom: 0;
				background: #F5F5F5;
				box-shadow: 1px 1px #CCCCCC;
				display: flex;
				justify-content: space-between;
				align-items: center;
				transition: all 0.6s;

				.left {
					width: 69px;
					// margin-top: 19px;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30px;
				}
			}

			.account {
				height: 400rpx;

			}

			.account1 {
				height: 700rpx;
			}
		}

		.area {
			width: 100%;
			margin-top: 19rpx;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

			.carousel {
				width: 300px;
				height: 169px;
				z-index: 3;
				border: 1px solid grey;
				box-shadow: 3px 3px grey;
				border-radius: 30rpx;

				.carousel-item {
					width: 100%;
					height: 100%;
					border-radius: 30rpx;

					image {
						height: 169px;
					}
				}
			}

			.upload1 {
				width: 300px;
				margin-top: 10px;
				height: 180px;
				z-index: 3;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 6px;
				border: 1px dotted grey;

			}
		}

		.order {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.title {
				width: 66%;
				height: 19px;
				font-size: 16px;
				color: #0099CC;
				text-align: center;
			}

			.diet-area {
				width: 89vw;
				display: flex;
				align-items: center;
				margin-top: 10px;
				border-radius: 6rpx;
				border-bottom: 1rpx solid grey;
			}

		}

		.modal {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>